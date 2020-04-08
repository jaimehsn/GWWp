const User = require("../models/user.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        category: req.body.category
    });

    // Save Customer in the database
    User.create(user, (err, data) => {
        if (err)
            if (err.kind === "it_exists") {
                res.status(400).send({
                    message: "This email is already registered."
                });
            } else {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Customer."
                });
            }
        else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    User.findByMail(req.params.userMail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.userMail}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.userMail
                });
            }
        } else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.updateByMail(req.params.userMail, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with Email ${req.params.userMail}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating User with Email " + req.params.userMail
                });
            }
        } else res.send(data);
    });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    User.remove(req.params.userMail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with Email ${req.params.userMail}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with Email " + req.params.userMail
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while removing all customers."
            });
        else res.send({ message: `All Customers were deleted successfully!` });
    });
};