const sql = require("./db");

exports.authentication = (email, password, result) => {

    sql.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            console.log("error:", error)
            result(error, null);
            return;
        }

        if (results.length > 0) {
            result(error, true);
            return;
        }

        result({ kind: "not_found" }, false);
    })
}


exports.encri = (email, password, result) => {}

exports.exist = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email LIKE '${email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, email);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, true);
            return;
        }

        // not found Customer with the id
        result(null, false);
    });
}