'use strict'

const jwt = require("jsonwebtoken")
const moment = require("moment")
const config = require("../config/env.config")


exports.createToken = (user) => {
    const payload = {
        sub: user.email,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.sign(payload, config.SECRET)
}

exports.autentication = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("AUTENTICADO")
    if (token) {
        jwt.verify(token, config.SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    mensaje: 'Invalid token..',
                });
            } else {
                req.decoded = decoded;
                console.log("TOKEN DECODE: ", decoded.sub)
                req.decodeEmail = decoded.sub
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token required.'
        });
    }
};