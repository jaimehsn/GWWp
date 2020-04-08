const sql = require("./db");

exports.authentication = (email, password, result) => {
    //app.post('/auth', function(request, response) {
    //var email = request.body.email;
    //var password = request.body.password;
    /*if (email && password) {
        sql.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.email = email;
                result('LOGIN!', error);
                return;
            } else {
                result('Incorrect Username and/or Password!', error);
                return;
            }
        });
    } else {
        result('Please enter Username and Password!', error);
    }*/
    //});
    sql.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
        if (error) {
            console.log("error:", error)
            result(error, null);
            return;
        }

        if (results.length > 0) {
            //request.session.loggedin = true;
            //request.session.email = email;
            result(error, true);
            return;
        }

        result({ kind: "not_found" }, false);
    })
}