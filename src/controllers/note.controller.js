const Note = require("../models/note.model")
const Sequelize = require("sequelize")
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (Object.keys(req.body).length != 4) {
        res.status(400).send({
            message: "Content can not be empty!",

        })
    } else {
        // Create a Note
        Note.create({
            title: req.body.title,
            content: req.body.content,
            autor: req.body.autor,
            codeGrp: req.body.codeGrp,
        })
            .then((note, created) => {
                console.log(
                    note.get({
                        plain: true,
                    })
                );
                console.log("Resultado de la insercion: ", created);
                //
                if (note) {
                    res.status(200).send({
                        message: "Create note OK.",
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note.",
                });
            });



    }


}

// Retrieve all Note from the database.
exports.findAll = (req, res) => {
    Note.findAll({
        //SELECT name, lastname , email ...
        attributes: ["id", "title", "content", "autor"],
        where: {
            codeGrp: req.params.codeGrp,
        }
    })
        .then((notes) => {
            //result of promis
            console.log(notes);
            res.status(200).send(notes);
        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500);
        });
}

// Update a Note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    Note.update(
        {
            //UPDATE name, lastname , email ...
            //Parameters
            title: req.body.title,
            content: req.body.content,
            autor: req.body.autor,
            updatedAt: Sequelize.DATE,
        },
        {
            where: {
                id: req.params.noteId,
            },
        }
    )
        .then((notes) => {
            //result of promis
            console.log("LOG:", notes);
            if (notes[0] == 0) {
                res.status(200).send({
                    message: `Not found Note with Id ${req.params.noteId}.`
                });
            } else {
                res.status(200).send({
                    message: "Note update successful",
                });
            }
        })
        .catch((err) => {
            //On case of err
            console.log("Error: ", err);
            res.status(500).send({
                message: "Error updating Note with Id " + req.params.noteId,
            });
        });
}

// Delete a Note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.destroy(
        {
            //DELETE ...
            where: {
                id: req.params.noteId,
            },
        }
    )
        .then((notes) => {
            //result of promis
            console.log("LOG:", notes);
            if (notes == 0) {
                res.status(200).send({
                    message: `Not found Note with Id ${req.params.noteId}.`
                });
            } else {
                res.status(200).send({
                    message: "Note delete successful",
                });
            }
        })
        .catch((err) => {
            //On case of err
            console.log("Error: ", err);
            res.status(500).send({
                message: "Error deleting Note with Id " + req.params.noteId,
            });
        });
}

// Delete all Note from the group.
exports.deleteAll = (req, res) => {
    Note.destroy(
        {
            //DELETE ...
            where: {
                codeGrp: req.params.codeGrp,
            },
        }
    )
        .then((notes) => {
            //result of promis
            console.log("LOG:", notes);
            if (notes == 0) {
                res.status(200).send({
                    message: `Not found Notes with Code Group: ${req.params.codeGrp}.`
                });
            } else {
                res.status(200).send({
                    message: "Notes delete successful",
                });
            }
        })
        .catch((err) => {
            //On case of err
            console.log("Error: ", err);
            res.status(500).send({
                message: "Error deleting Notes with Code Group: " + req.params.codeGrp,
            });
        });
}