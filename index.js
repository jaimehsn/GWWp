const app = require("./app")

// set port, listen for requests
app.listen(9000, () => {
    console.log("Server is running on port 9000.");
})