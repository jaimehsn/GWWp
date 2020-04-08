module.exports = app => {
    const users = require("../controllers/user.controller")

    // Create a new Customer
    app.post("/users", users.create)

    // Retrieve all Customers
    app.get("/users", users.findAll)

    // Retrieve a single Customer with customerId
    app.get("/users/:userMail", users.findOne)

    // Update a Customer with customerId
    app.put("/users/:userMail", users.update)

    // Delete a Customer with customerId
    app.delete("/users/:userMail", users.delete)

    // Create a new Customer
    //app.delete("/users", users.deleteAll)
}