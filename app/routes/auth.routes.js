module.exports = app => {
    const auth = require("../controllers/auth.controller")

    // Log in
    app.post("/auth", auth.authentication)

}