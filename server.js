const express = require("express")
const session = require('express-session')
const bodyParser = require("body-parser")
const morgan = require('morgan')

const app = express()
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

// simple route
require("./app/routes/customer.routes")(app);
require("./app/routes/note.routes")(app);
require("./app/routes/auth.routes")(app);


// set port, listen for requests
app.listen(9000, () => {
    console.log("Server is running on port 9000.");
})