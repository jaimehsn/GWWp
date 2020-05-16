const Sequelize = require("sequelize")
const Group = require("../models/Group");
const Note = require("../models/Note")
const Users_group = require("../models/Users_group")
const User = require("../models/User")

//Associations
User.hasMany(Users_group, {
    as: "user_group_Model",
    foreignKey: 'id_user',
});
Users_group.belongsTo(User, {
    as: "user__Model",
    foreignKey: 'id_user',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});
Group.hasMany(Note, {
    as: "NotesModel",
    foreignKey: "codeGrp",
})
Note.belongsTo(Group, {
    as: "GroupsModel",
    foreignKey: "codeGrp",
    onDelete: 'cascade',
    onUpdate: 'cascade',
})
Group.hasMany(Users_group, {
    as: "user_groupModel",
    foreignKey: 'id_group',
});
Users_group.belongsTo(Group, {
    as: "group_Model",
    foreignKey: 'id_group',
    onDelete: 'cascade',
    onUpdate: 'cascade',
});

//Show all notes of group
exports.findAll = (req, res) => {
    //It is verified that the request contains the necessary fields
    if (Object.keys(req.body).length != 1) {
        res.status(400).send({
            message: "Bad query!",
        });
    } 

    Group.findAll({
        //SELECT name, lastname , email ...
        attributes: [],
        where: {
            name: req.body.name,
        },
        include: [{
            model: Note,
            as: "NotesModel",
            attributes:["title","content"],
        }]
    })
        .then((group) => {
            //result of promis
            console.log(group);
            res.status(200).send(group);
        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500);
        });
}


// Create and Save a new Customer
exports.create = (req, res, next) => {
    ////It is verified that the request contains the necessary fields
    if (Object.keys(req.body).length < 1) {
        res.status(400).send({
            message: "Bad query!",
        });
    }

    //Insert User in DB
    Group.findOrCreate({
        where: { name: req.body.grpName },
        defaults: { name: req.body.grpName },
    })
        .then(([group, created]) => {
            console.log(
                group.get({
                    plain: true,
                })
            );
            console.log(created);
            if (created) {
                console.log("**GROUP CREATED**")
                req.pormisos = 1
                next()
                /*res.status(200).send({
                    message: "Group created.",
                });*/
            } else {
                res.status(400).send({
                    message: "This Name is already registered.",
                });
            }
        })
        .catch((err) => {
            //Catch err in the query
            console.log(err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Group.",
            });
        });
};

// Update name group
exports.update = (req, res) => {
    ////It is verified that the request contains the necessary fields
    if (Object.keys(req.body).length != 2) {
        res.status(400).send({
            message: "Bad query!",
        });
    }

    Group.update(
        {
            //UPDATE name, lastname , email ...
            //Parameters
            name: req.body.newName,
            updatedAt: Sequelize.DATE,
        },
        {
            where: {
                name: req.body.oldName,
            },
        }
    )
        .then((group) => {
            //result of promis
            console.log("LOG:", group);
            if (group[0] == 0) {
                res.status(404).send({
                    message: `Not found Group with Name ${req.body.oldName}.`
                });
            } else {
                res.status(200).send({
                    message: "Group update successful",
                });
            }
        })
        .catch((err) => {
            //On case of err
            console.log("Error: ", err);
            res.status(500).send({
                message: "Error updating Group with Name " + req.body.oldName,
            });
        });
};


//DELETE group
exports.delete = (req, res) => {
    
    //It is verified that the request contains the necessary fields
    if (Object.keys(req.body).length != 1) {
        res.status(400).send({
            message: "Bad query!",
        });
    }
    Users_group.findOne({
        //who is the group administrator is checked
        attributes: ["admin", "id_user"],
        include: [{
            model: Group,
            as: "group_Model",
            attributes:[],
            where:{ name: req.body.name}
        },{
            model: User,
            as: "user__Model",
            attributes:[],
            where:{ email: req.decoded.sub}
        }]
    })
        .then((data) => {
            //and then the group is removed
            console.log(data);
            if(data.dataValues.admin){
                Group.destroy(
                    {
                        //DELETE ...
                        where: {
                            name: req.body.name,
                        },
                        include: [{ model: Note, as: "NotesModel" }]
                    }
                )
                    .then((groups) => {
                        //result of promis
                        console.log("LOG:", groups);
                        if (groups == 0) {
                            res.status(404).send({
                                message: `Not found Group with name ${req.body.name}.`
                            });
                        } else {
                            res.status(200).send({
                                message: "Group delete successful",
                            });
                        }
                    })
                    .catch((err) => {
                        //On case of err
                        console.log("Error: ", err);
                        res.status(500).send({
                            message: "Error deleting User with Group " + req.body.name,
                        });
                    });
            }else{
                res.status(401).send({
                    message: "You do not have authorization on this group"
                });
            }
        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500);
        });


    /*Group.destroy(
        {
            //DELETE ...
            where: {
                name: req.body.name,
            },
            include: [{ model: Note, as: "NotesModel" }]
        }
    )
        .then((groups) => {
            //result of promis
            console.log("LOG:", groups);
            if (groups == 0) {
                res.status(404).send({
                    message: `Not found Group with name ${req.body.name}.`
                });
            } else {
                res.status(200).send({
                    message: "Group delete successful",
                });
            }
        })
        .catch((err) => {
            //On case of err
            console.log("Error: ", err);
            res.status(500).send({
                message: "Error deleting User with Group " + req.body.name,
            });
        });*/
};