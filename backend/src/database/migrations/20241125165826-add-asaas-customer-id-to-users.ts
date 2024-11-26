'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'asaasCustomerId', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'asaasCardToken', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'cnpj', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'zipcode', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'asaasCustomerId'),
      queryInterface.removeColumn('Users', 'asaasCardToken'),
      queryInterface.removeColumn('Users', 'cnpj'),
      queryInterface.removeColumn('Users', 'zipcode'),
    ]);
  }
};
