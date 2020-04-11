const Note = require("../models/note.model")

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    } else {
        // Create a Note
        const note = new Note({
            title: req.body.title,
            content: req.body.content,
            autor: req.body.autor,
            codeGrp: req.body.codeGrp
        })

        // Save Note in the database
        Note.create(note, (err, data) => {
            if (err) {
                if (err.kind === "er_parameter_undefined") {
                    res.status(400).send({
                        message: "Parameter error."
                    })
                } else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note."
                    })
                }

            } else res.send(data)
        })
    }


}

// Retrieve all Note from the database.
exports.findAll = (req, res) => {
    Note.getAll(req.params.codeGrp, (err, data) => {
        if (err)
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Notes with id ${req.params.codeGrp}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving Notes with id " + req.params.codeGrp
                })
            }
        else res.send(data)
    })
}

// Find a single Note with a customerId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Note with id ${req.params.noteId}.`
                })
            } else {
                res.status(500).send({
                    message: "Error retrieving Note with id " + req.params.noteId
                })
            }
        } else res.send(data);
    })
}

// Update a Note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    Note.updateById(req.params.noteId, new Note(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.noteId}.`
                })
            } else {
                res.status(500).send({
                    message: "Error updating Customer with id " + req.params.noteId
                })
            }
        } else res.send(data)
    })
}

// Delete a Note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.remove(req.params.noteId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Note with id ${req.params.noteId}.`
                })
            } else {
                res.status(500).send({
                    message: "Could not delete Note with id " + req.params.noteId
                })
            }
        } else res.send({ message: `Note was deleted successfully!` })
    })
}

// Delete all Note from the group.
exports.deleteAll = (req, res) => {
    Note.removeAll(req.params.codeGrp, (err, data) => {
        if (err)
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Notes with codeGrp ${req.params.codeGrp}.`
                })
            } else {
                res.status(500).send({
                    message: "Could not delete Notes with codeGrp " + req.params.codeGrp
                })
            }
        else res.send({ message: `All Notes were deleted successfully!` })
    })
}