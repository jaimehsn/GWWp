const Sequelize = require("sequelize");
const db = require("./db");

//Sequelize user model

  const User = db.define("user", {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(40),
    },
    lastname: {
      type: Sequelize.STRING(40),
    },
    email: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(9),
    },
    category: {
      type: Sequelize.STRING(40),
    },
  });
  
module.exports = User


