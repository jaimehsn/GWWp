const User = require('../models/user.model')
const bcrypt = require("bcrypt")
const service = require("../services")

exports.login = (req, res) => {

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
            
            if(users){
                console.log("DB: ",users[0].password);
            }
            if (users.length == 0) {
                res.status(404).send("Non-existent user");
            } else {
                bcrypt.compare(user.password, users[0].password, (err, match) => {
                    if (err) {
                        //console.log("DB: " ,users.email);
                        res.status(500).send({
                            message: err.message || "Hash Error"
                        })
                    }else{
                        if (!match) {
                            res.status(403).send({
                                message: "Bad credentials"
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

    /*if (req.body.email === undefined || req.body.password === undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    Auth.authentication(req.body.email, req.body.password, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Incorrect Username and/or Password!.`
                })
            } else {
                res.status(500).send({
                    message: "Server error"
                })
            }
        } else {
            req.session.loggedin = true;
            req.session.email = req.body.email;
            res.status(200).send({ message: "Session STARTED successfully!" })
        }
    })*/
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {

        if (err) {
            res.status(500).send({
                message: "Server error"
            })
        }

        res.status(200).send({ message: "Session ENDED successfully!" })
    })
}