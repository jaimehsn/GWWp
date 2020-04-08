module.exports = app => {
    const notes = require("../controllers/note.controller")

    // Create a new Customer
    app.post("/notes", notes.create)

    // Retrieve all Customers
    app.get("/notes/:codeGrp", notes.findAll)

    // Retrieve a single Customer with customerId
    app.get("/notes/:noteId", notes.findOne)

    // Update a Customer with customerId
    app.put("/notes/:noteId", notes.update)

    // Delete a Customer with customerId
    app.delete("/notes/delOnes/:noteId", notes.delete)

    // Create a new Customer
    app.delete("/notes/grpDel/:codeGrp", notes.deleteAll)
}