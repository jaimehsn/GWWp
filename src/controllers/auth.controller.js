const User = require('../models/User')
const bcrypt = require("bcrypt")
const service = require("../services")

exports.login = (req, res) => {
    console.log("REQ:",req.body)
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    User.findAll({
        //SELECT name, lastname , email ...
        attributes: ["password", "email"],
        where: {
            email: [req.body.email],
        },
    })
        .then((users) => {

            //result of promis
            if (users.length == 0) {
                res.status(404).send({
                    message: "User not found"
                });
            } else {
                //Copare de hash password
                bcrypt.compare(user.password, users[0].password, (err, match) => {
                    if (err) {
                        //console.log("DB: " ,users.email);
                        res.status(500).send({
                            message: err.message || "Hash Error"
                        })
                    }else{
                        if (!match) {
                            res.status(403).send({
                                message: "Incorrect password"
                            })
                        } else {
                            res.status(200).send({
                                token: service.createToken(user)
                            });
                        }
                    }
                })
            }
        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500);
        });

}

