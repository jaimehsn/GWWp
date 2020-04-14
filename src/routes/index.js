const express = require('express')
const api = express.Router()
const users = require("../controllers/user.controller")
const notes = require("../controllers/note.controller")
const auth = require("../controllers/auth.controller")
const service = require("../services")

// Register an user
api.post("/users", [users.create, auth.login])

// Retrieve all Customers
api.get("/users", [service.autentication,users.findAll])

// Retrieve a single Customer with customerId
api.get("/users/:userMail", [service.autentication,users.findOne])

// Update a Customer with customerId
api.put("/users/:userMail", [service.autentication,users.update])

// Delete a Customer with customerId
api.delete("/users/:userMail", [service.autentication,users.delete])

// Log In
api.post("/auth", auth.login)

//Log Out 
api.delete("/auth", auth.logout)

/*api.post("/notes", (req, res) => {
    if (req.session.loggedin) {
        notes.create(req, res)
    } else {
        res.status(403).send({ message: `Unauthorized action` })
    }
})*/

//create a note
api.post("/notes", [service.autentication,notes.create])

// Retrieve all Customers
api.get("/notes/:codeGrp", [service.autentication,notes.findAll])

// Update a Customer with customerId
api.put("/notes/:noteId", [service.autentication,notes.update])

// Delete a Customer with customerId
api.delete("/notes/delOnes/:noteId", [service.autentication,notes.delete])

// Create a new Customer
api.delete("/notes/grpDel/:codeGrp", [service.autentication,notes.deleteAll])

module.exports = api