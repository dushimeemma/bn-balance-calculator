module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Balances', 'number_of_days', {
      type: Sequelize.INTEGER,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Balances', 'number_of_days', {
      type: Sequelize.INTEGER,
    });
  },
};
