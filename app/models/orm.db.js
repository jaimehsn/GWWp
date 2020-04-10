const Sequelize = require("sequelize")

const sequelize = new Sequelize("GWWp", "prueba", "1234", {
    host: 'localhost',
    dialect: "mariadb"
})

module.exports = sequelize
global.sequelize = sequelize