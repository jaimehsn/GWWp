'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users",{
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
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(9),
      },
      category: {
        type: Sequelize.STRING(40),
      },
      createdAt: Sequelize.DATE,
      
      updatedAt: Sequelize.DATE,
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users")
  }
};
