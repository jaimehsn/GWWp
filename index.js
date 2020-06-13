const app = require("./app");
const connect = require("./src/models/db");
const fs = require('fs')
const http = require("http")
const https = require("https").createServer({
  key: fs.readFileSync('./src/ssl/key.pem', 'utf8'),
  cert: fs.readFileSync('./src/ssl/cert.pem', 'utf8'),
  passphrase: 'L0sm0nt3sn0t13n3n0j0s'
}, app)


const io = require("socket.io")(https)

io.on('connection', (socket) => {
  console.log('**************USUARIO CONECTADO SOCKET**************');
  socket.on('update-note', (data) => {
    io.emit(data.group, data);
    console.log("DATOS RECIBIDOS DEL SOCKET: ", data.group);
  });
  socket.on('disconnect', () => {
    console.log('**************USUARIO DESCONECTADO SOCKET**************');
  });
});


//Test database

connect.authenticate()
  .then(() => {
    console.log("Database connected...");
    //Integrate socket
    app.listen(8080, ()=>{
      console.log("Server is running on port 8080.");
    })
    https.listen(443, () => {
      console.log("Server is running on port 443.");
    });
  })
  .catch((err) => {
    console.log("Database connection Error: ", err);
  });

