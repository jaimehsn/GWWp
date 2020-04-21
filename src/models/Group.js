const Sequelize = require("sequelize");
const db = require("./db");
const Note = require("./Note")

//Sequelize group model
const Group = db.define("group", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
});




module.exports = Group;