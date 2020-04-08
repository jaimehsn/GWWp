module.exports = app => {
    const auth = require("../controllers/auth.controller")

    // Log In
    app.post("/auth", auth.authentication)

    //Log Out 
    app.delete("/auth", auth.logout)

}