const express = require("express")
const bodyParser = require("body-parser")
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))

// parse requests of content-type: application/json
app.use(bodyParser.json())

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
require("./app/routes/customer.routes.js")(app);
app.delete("/:id", () => {
    console.log("Funciona")
});

// set port, listen for requests
app.listen(9000, () => {
    console.log("Server is running on port 3000.");
})