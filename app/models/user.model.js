const sql = require("./db.js");
const auth = require('./auth.model')

// constructor
const User = function(user) {
    this.name = user.name;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.category = user.category;
};

User.create = (newUser, result) => {
    auth.exist(newUser.email, (err, res) => {
        if (err) {
            result(err, null)
            return;
        }

        if (res == true) {
            result({ kind: "it_exists" }, null);
            return;
        } else {
            sql.query("INSERT INTO users (email,password) VALUE (?, ?)", [newUser.email, newUser.password], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("created User: ", { id: res.insertId, ...newUser });
                result(null, { id: res.insertId, ...newUser });
            });
        }
    })



};

User.findByMail = (userMail, result) => {
    sql.query(`SELECT * FROM users WHERE email LIKE '${userMail}'`, (err, res) => {
        if (err) {

            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    sql.query("SELECT name,lastname, category, phone FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Users: ", res);
        result(null, res);
    });
};

User.updateByMail = (email, user, result) => {
    sql.query(
        "UPDATE users SET name = ?, lastname = ?, password = ?, phone = ?, category = ? WHERE email LIKE ?", [user.name, user.lastname, user.password, user.phone, user.category, email],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { email: email, ...user });
            result(null, { email: email, ...user });
        }
    );
};

User.remove = (email, result) => {
    sql.query("DELETE FROM users WHERE email = ?", email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with email: ", email);
        result(null, res);
    });
};


module.exports = User;