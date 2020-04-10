const express = require("express")
const session = require('express-session')
const bodyParser = require("body-parser")
const morgan = require('morgan')
const app = express()
const api = require("./app/routes")

app.use(morgan('combined'))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//DB connection
require("./app/models/orm.db")
    // simple route
    //require("./app/routes/user.routes")(app);
    //require("./app/routes/note.routes")(app);
    //require("./app/routes/auth.routes")(app);
    //app.use('/api', api)

/*app.get("/sesion", (req, res) => {
    res.send({ message: `${req.session.loggedin}` })
})*/
require("./prueba")()


module.exports = app