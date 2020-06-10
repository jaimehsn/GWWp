const express = require('express')
const api = express.Router()
const users = require("../controllers/user.controller")
const notes = require("../controllers/note.controller")
const auth = require("../controllers/auth.controller")
const groups = require("../controllers/group.controller")
const users_groups = require("../controllers/users_groups.controller")
const service = require("../services")


// Log In
api.post("/auth", auth.login)

//-------------------------------------------------------------------------------------------

// Register an user
api.post("/users", [users.create, auth.login])

// Retrieve a single Customer with customerId
api.get("/users/:userMail", [service.autentication, users.findOne])

// Update a Customer with customerId
api.put("/users/:userMail", [service.autentication, users.update])

// Delete a Customer with customerId
api.delete("/users/:userMail", [service.autentication, users.delete])

//-------------------------------------------------------------------------------------------

//create a note
api.post("/notes", [service.autentication, notes.create])

// Retrieve all Customers
api.get("/notes/:nameGrp", [service.autentication, notes.findAll])

// Update a Customer with customerId
api.put("/notes/:noteId", [service.autentication, notes.update])

// Delete a Customer with customerId
api.delete("/notes/delOnes/:noteId", [service.autentication, notes.delete])

//-------------------------------------------------------------------------------------------

//Get group notes
api.get("/groups", [service.autentication, groups.findAll])

//Create group
api.post("/groups", [service.autentication, groups.create, users_groups.addToGroup])

//update group
api.put("/groups", [service.autentication, groups.update])

//Delete a group
api.delete("/groups", [service.autentication, groups.delete])

//-------------------------------------------------------------------------------------------

//Add user into group
api.post("/add", [service.autentication, users_groups.addToGroup])

//Delete user fron a group
api.delete("/del", [service.autentication, users_groups.delFromGroup])

//list user of a group
api.get("/listUsers", [service.autentication, users_groups.findAllUsersOfGroup])

//List groups of a users
api.get("/listGroups", [service.autentication, users_groups.findAllGroupsOfUser])

//-------------------------------------------------------------------------------------------

//Export routes
module.exports = api