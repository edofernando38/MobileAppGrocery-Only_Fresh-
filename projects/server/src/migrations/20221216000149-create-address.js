"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      addressLine: {
        type: Sequelize.STRING,
      },
      postalCode: {
        type: Sequelize.INTEGER,
      },
      longitude: {
        type: Sequelize.STRING,
      },
      lattitude: {
        type: Sequelize.STRING,
      },
      detail: {
        type: Sequelize.STRING,
      },
      defaultAddress: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};
