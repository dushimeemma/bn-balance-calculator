module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Balances', 'balance', {
      type: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Balances', 'balance', {
      type: Sequelize.INTEGER,
    });
  },
};
