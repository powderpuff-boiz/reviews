'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reviews', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      product_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      summary: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      body: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      recommend: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      reported: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      reviewer_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reviewer_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      response: {
        type: Sequelize.STRING,
        allowNull: true
      },
      helpfulness: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  }
};