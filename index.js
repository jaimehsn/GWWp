const app = require("./app");
const connect = require("./src/models/db");

//Test database

connect.authenticate()
  .then(() => {
    console.log("Database connected...");
    // set port, listen for requests
    app.listen(9000, () => {
      console.log("Server is running on port 9000.");
    });
  })
  .catch((err) => {
    console.log("Database connection Error: ", err);
  });
