const express = require('express')
const api = express.Router()
const users = require("../controllers/user.controller")
const notes = require("../controllers/note.controller")
const auth = require("../controllers/auth.controller")
const groups = require("../controllers/group.controller")
const users_groups = require("../controllers/users_groups.controller")
const service = require("../services")


//-------------------------------------------------------------------------------------------
// Register an user
api.post("/users", [users.create/*, auth.login*/])

// Retrieve all Customers
api.get("/users", [service.autentication,users.findAll])

// Retrieve a single Customer with customerId
api.get("/users/:userMail", [service.autentication,users.findOne])

// Update a Customer with customerId
api.put("/users/:userMail", [service.autentication,users.update])

// Delete a Customer with customerId
api.delete("/users/:userMail", [/*service.autentication,*/users.delete])

//-------------------------------------------------------------------------------------------
// Log In
api.post("/auth", auth.login)

//-------------------------------------------------------------------------------------------
//create a note
api.post("/notes", [notes.create])

// Retrieve all Customers
api.get("/notes/:nameGrp", [notes.findAll])

// Update a Customer with customerId
api.put("/notes/:noteId", [/*service.autentication,*/notes.update])

// Delete a Customer with customerId
api.delete("/notes/delOnes/:noteId", [/*service.autentication,*/notes.delete])

//-------------------------------------------------------------------------------------------
//Get group notes
api.get("/groups", groups.findAll)

//Create group
api.post("/groups", groups.create)

//update group
api.put("/groups", groups.update)

//Delete a group
api.delete("/groups", groups.delete)

//-------------------------------------------------------------------------------------------
//Add user into group
api.post("/add", users_groups.addToGroup)
//list user of a group
api.get("/listUsers", users_groups.findAllUsersOfGroup)
api.get("/listGroups", users_groups.findAllGroupsOfUser)
module.exports = api