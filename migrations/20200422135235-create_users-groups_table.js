'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users_groups", {
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users_groups")
  }
};
