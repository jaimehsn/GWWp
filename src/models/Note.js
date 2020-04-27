const Sequelize = require("sequelize");
const db = require("./db");

//Note model denitions

const Note = db.define("note", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
    },
    autor: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    codeGrp: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
    },
});


module.exports = Note;