const Note = require("../models/Note")
const Group = require("../models/Group")
const Sequelize = require("sequelize")
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (Object.keys(req.body).length != 5) {
        res.status(400).send({
            message: "Bad query.",
        })
    } else {
        // Create a Note
        Group.findOne({
            //SELECT name, lastname , email ...
            attributes: ["id"],
            where: {
                name: req.body.grpName,
            },
        })
            .then((data) => {
                //result of promis
                //console.log(data.id);
                Note.create({
                    title: req.body.title,
                    content: req.body.content,
                    autor: req.body.autor,
                    state: req.body.state,
                    codeGrp: data.id,
                })
                    .then((note, created) => {
                        console.log(
                            note.get({
                                plain: true,
                            })
                        );
                        //
                        if (note) {
                            console.log("****CREATED NOTE****");
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
            })
            //On case of err
            .catch((err) => {
                console.log("Error: ", err);
                res.sendStatus(500);
            });
    }
}

// Retrieve all Note from the database.
exports.findAll = (req, res) => {

    //It is verified that the request contains the necessary fields
    if (Object.keys(req.params).length != 1) {
        res.status(400).send({
            message: "Bad query!",
        });
    }   

    Group.findAll({
        //SELECT name, lastname , email ...
        attributes: ["name"],
        where: {
            name: req.params.nameGrp,
        },
        include: [{
            model: Note,
            as: "NotesModel",
            attributes: ["title", "content", "autor","state", "id"],
        }]
    })
        .then((data) => {
            //result of promis
            console.log("****NOTES FOUND****")
            res.status(200).send(data);
        })
        //On case of err
        .catch((err) => {
            console.log("Error: ", err);
            res.sendStatus(500);
        });
}

// Update a Note identified by the noteId in the request
exports.update = (req, res) => {
    //It is verified that the request contains the necessary fields
    if (Object.keys(req.body).length != 4) {
        console.log("****BAD REQUEST****")
        res.status(400).send({
            message: "Bad query!",
        });
    }
    Note.update(
        {
            //UPDATE name, lastname , email ...
            //Parameters
            title: req.body.title,
            content: req.body.content,
            state: req.body.state,
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
            if (notes[0] == 0) {
                console.log("****NOTES NOT FOUND****")
                res.status(404).send({
                    message: `Not found Note.`
                });
            } else {
                console.log("****UPDATED NOTE****")
                res.status(200).send({
                    message: "Note update successful.",
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
            
            if (notes == 0) {
                console.log("****NOTES NOT FOUND****");
                res.status(404).send({
                    message: `Not found Note with Id ${req.params.noteId}.`
                });
            } else {
                console.log("****REMOVED NOTE****");
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
