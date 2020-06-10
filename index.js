const app = require("./app");
const connect = require("./src/models/db");
const fs = require('fs')
const https = require("https")

//Test database

connect.authenticate()
  .then(() => {
    console.log("Database connected...");
    // set port, listen for requests
    https.createServer({
      key: fs.readFileSync('./src/ssl/key.pem'),
      cert: fs.readFileSync('./src/ssl/cert.pem'),
      passphrase: 'L0sm0nt3sn0t13n3n0j0s'
    }, app).listen(443, () => {
      console.log("Server is running on port 443.");
    });
  })
  .catch((err) => {
    console.log("Database connection Error: ", err);
  });
