const Sequelize = require("sequelize");
const db = require("./db");

//Sequelize user_grops FK model

  const Users_group = db.define("users_group", {
    id_user: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
    },
    id_group: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
    
  });
  
module.exports = Users_group


