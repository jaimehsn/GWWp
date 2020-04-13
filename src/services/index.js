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