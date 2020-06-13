const Sequelize = require("sequelize")
const User = require("../models/User")
const Group = require("../models/Group")
const Users_group = require("../models/Users_group")

//Assosiations
User.hasMany(Users_group, {
    as: "usergroupModel",
    foreignKey: 'id_user',
});
Users_group.belongsTo(User, {
    as: "userModel",
    foreignKey: 'id_user',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Group.hasMany(Users_group, {
    as: "usergroupModel",
    foreignKey: 'id_group',
});
Users_group.belongsTo(Group, {
    as: "groupModel",
    foreignKey: 'id_group',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});

//ADD user in to a group
exports.addToGroup = (req, res) => {
    if(!req.permisos){
        req.permisos = 0
    }
    if(!req.body.email){
        req.body.email = req.decoded.sub
    }
    console.log(req.body.email)
    User.findAll({
        //The user id is consulted
        attributes: ["id"],
        where: {
            email: req.body.email
        }
    })
        .then(([users]) => {
            //result of promiss
            
            if(!users){
                console.log("****USER NOT FOUND****"),
                res.status(404).send({
                    message: "User not found.",
                });
            }else{
                const var_id_user = users.id
                Group.findAll({
                    //SELECT name, lastname , email ...
                    attributes: ["id"],
                    where: {
                        name: req.body.grpName
                    }
                })
                    .then(([groups]) => {
                        //result of promiss
                        const var_id_group = groups.id
                        //insert query
                        Users_group.findOrCreate({
                            where: {
                                id_user: var_id_user,
                                id_group: var_id_group,
                            },
                            defaults: {
                                id_user: var_id_user,
                                id_group: var_id_group,
                                admin: req.permisos,
                            }
                        })
                            .then(([add, created]) => {
                                if (created) {
                                    console.log("****ADDED USER****")
                                    //
                                    res.status(200).send({
                                        message: "Added user.",
                                    });
                                } else {
                                    console.log("****ADDED USER****")
                                    res.status(400).send({
                                        message: "That User already be on this group.",
                                    });
                                }
                            })
                            .catch((err) => {
                                //Catch err in the query
                                console.log(err)
                                if(err != ERR_HTTP_HEADERS_SENT){
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while adding the User.",
                                    });
                                }else{
                                    console.log("****HEADERS ERROR****")
                                }
                                
                            });
    
                    })
                    //On case of err
                    .catch((err) => {
                        console.log("Error: ", err);
                        res.sendStatus(500);
                    });
            }
            

        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500).send({
                message: err.message || "ERROR PRUEBA.",
            });
        });
}

exports.delFromGroup = (req, res) => {
    if(!req.permisos){
        req.permisos = 0
    }
    User.findAll({
        //The user id is consulted
        attributes: ["id"],
        where: {
            email: req.body.email
        }
    })
        .then(([users]) => {
            //result of promiss
            const var_id_user = users.id

            Group.findAll({
                //SELECT name, lastname , email ...
                attributes: ["id"],
                where: {
                    name: req.body.grpName
                }
            })
                .then(([groups]) => {
                    //result of promiss
                    const var_id_group = groups.id
                    //insert query
                    Users_group.destroy({
                        where: {
                            id_user: var_id_user,
                            id_group: var_id_group,
                        },
                    })
                        .then((del) => {
                            if (del == 0) {
                                console.log("****USER NOT FOUND****")
                                res.status(404).send({
                                    message: `Error 404`
                                });
                            } else {
                                console.log("****DELETED USER****")
                                res.status(200).send({
                                    message: "Deleted user.",
                                });
                            }
                        })
                        .catch((err) => {
                            //Catch err in the query
                            console.log("Error: ",err)
                            res.status(500).send({
                                message: err.message || "Some error occurred while adding the User.",
                            });
                        });

                })
                //On case of err
                .catch((err) => {
                    console.log("Error: ", err);
                    res.sendStatus(500);
                });

        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500);
        });
}

//list users of a group
exports.findAllUsersOfGroup = (req, res) => {
    Group.findAll({
        //SELECT name, lastname , email ...
        attributes: ["id"],
        where: {
            name: req.query.grpName,
        }
    })
        .then(([group]) => {
            //result of promis
            const var_id_group = group.id
            Users_group.findAll({
                //SELECT name, lastname , email ...
                attributes: [],
                include: [{
                    model: User,
                    as: "userModel",
                    attributes:["email"],
                    
                }],
                where:{id_group: var_id_group}
            })
                .then((users) => {
                    //result of promis
                    //console.log(users);
                    console.log("****FOUND USERS****");
                    res.status(200).send(users);
                    
                })
                //On case of err
                .catch((err) => {
                    console.log("Error: ", err);
                    res.sendStatus(500);
                });

        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500);
        });
};

exports.findAllGroupsOfUser = (req, res) => {
    User.findAll({
        //SELECT name, lastname , email ...
        attributes: ["id"],
        where: {
            email: req.decodeEmail,
        }
    })
        .then(([users]) => {
            //result of promis
            const var_id_user = users.id
            Users_group.findAll({
                //SELECT name, lastname , email ...
                attributes: ["admin"],
                include: [{
                    model: Group,
                    as: "groupModel",
                    attributes:["name"],
                }],
                where:{id_user: var_id_user}
            })
                .then((groups) => {
                    //result of promis
                    //console.log(users);
                    console.log("****GROUPS FOUND****");
                    res.status(200).send(groups);
                    
                })
                //On case of err
                .catch((err) => {
                    console.log("Error: ", err);
                    res.sendStatus(500);
                });

        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500);
        });
};