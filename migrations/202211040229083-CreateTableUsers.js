'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: Sequelize.STRING,
      apellidoMaterno: Sequelize.STRING,
      apellidoPaterno: Sequelize.STRING,
      type: Sequelize.STRING,
      email: {
        type: Sequelize.STRING, unique: true, validate: {
          isEmail: true
        }
      },
      password: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
