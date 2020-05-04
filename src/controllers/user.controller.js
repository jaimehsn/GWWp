const Sequelize = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcrypt")

// Create and Save a new Customer
exports.create = (req, res, next) => {
    // Validate request
    console.log("REQ:",req.body)
    if (Object.keys(req.body).length != 2) {
        res.status(400).send({
            message: "Bad query!",
        });
    }
    //Hash password in to DB
    bcrypt.hash(req.body.password, 10, (err, passHash) => {
        if (err) {
            console.log("Hash Error: ", err)
            res.status(500).send({
                message: err.message || "Hash Error!",
            });
        }

        console.log("Hash: ", passHash)

        //Insert User in DB
        User.findOrCreate({
            where: { email: req.body.email },
            defaults: { password: passHash },
        })
            .then(([user, created]) => {
                console.log(
                    user.email
                );
                console.log(created);
                if (created) {
                    console.log("**USER CREATED**")
                    //Login
                    next()
                } else {
                    res.status(400).send({
                        message: "This email is already registered.",
                    });
                }
            })
            .catch((err) => {
                //Catch err in the query
                console.log(err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User.",
                });
            });
    });


};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    User.findAll({
        //SELECT name, lastname , email ...
        attributes: ["name", "lastname", "email"],
    })
        .then((users) => {
            //result of promis
            console.log(users);
            res.status(200).send(users);
        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500);
        });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    User.findAll({
        //SELECT name, lastname , email ...
        attributes: ["name", "lastname", "email"],
        where: {
            email: [req.params.userMail],
        },
    })
        .then((users) => {
            //result of promis
            console.log(users);
            if (users.length == 0) {
                res.status(200).send("Non-existent user");
            } else {
                res.status(200).send(users);
            }
        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500);
        });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    User.update(
        {
            //UPDATE name, lastname , email ...
            //Parameters
            name: req.body.name,
            lastname: req.body.lastname,
            password: req.body.password,
            phone: req.body.phone,
            category: req.body.category,
            updatedAt: Sequelize.DATE,
        },
        {
            where: {
                email: req.params.userMail,
            },
        }
    )
        .then((users) => {
            //result of promis
            console.log("LOG:", users);
            if (users[0] == 0) {
                res.status(200).send({
                    message: `Not found User with Email ${req.params.userMail}.`
                });
            } else {
                res.status(200).send({
                    message: "User update successful",
                });
            }
        })
        .catch((err) => {
            //On case of err
            console.log("Error: ", err);
            res.status(500).send({
                message: "Error updating User with Email " + req.params.userMail,
            });
        });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    User.destroy(
        {
            //DELETE ...
            where: {
                email: req.params.userMail,
            },
        }
    )
        .then((users) => {
            //result of promis
            console.log("LOG:", users);
            if (users == 0) {
                res.status(404).send({
                    message: `Not found User with Email ${req.params.userMail}.`
                });
            } else {
                res.status(200).send({
                    message: "User delete successful",
                });
            }
        })
        .catch((err) => {
            //On case of err
            console.log("Error: ", err);
            res.status(500).send({
                message: "Error deleting User with Email " + req.params.userMail,
            });
        });
};