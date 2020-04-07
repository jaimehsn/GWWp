module.exports = app => {
    const customers = require("../controllers/note.controller")

    // Create a new Customer
    app.post("/notes", customers.create)

    // Retrieve all Customers
    app.get("/notes/:codeGrp", customers.findAll)

    // Retrieve a single Customer with customerId
    app.get("/notes/:noteId", customers.findOne)

    // Update a Customer with customerId
    app.put("/notes/:noteId", customers.update)

    // Delete a Customer with customerId
    app.delete("/notes/delOnes/:noteId", customers.delete)

    // Create a new Customer
    app.delete("/notes/grpDel/:codeGrp", customers.deleteAll)
}