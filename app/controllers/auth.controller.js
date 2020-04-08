const Auth = require('../models/auth.model')

exports.authentication = (req, res) => {
    if (req.body.email === undefined || req.body.password === undefined) {
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
        } else res.status(200).send({
            message: "LOGIN!"
        });
    })
}