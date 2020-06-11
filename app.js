const express = require("express")
const session = require('express-session')
const bodyParser = require("body-parser")
const morgan = require('morgan')
const app = express()
const api = require("./src/routes")

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        res.send();
    });
});


app.use(morgan('tiny'))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/api', api)



//See session status
app.get("/sesion", (req, res) => {
    res.send({ message: `${req.session.loggedin}` })
})


module.exports = app