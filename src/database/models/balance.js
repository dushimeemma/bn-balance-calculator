const BalanceModel = (sequelize, DataTypes) => {
  const Balance = sequelize.define(
    'Balance',
    {
      amount: { type: DataTypes.INTEGER },
      amount_per_day: { type: DataTypes.INTEGER },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: 'User', key: 'id' },
      },
      number_of_days: { type: DataTypes.INTEGER },
      balance: { type: DataTypes.INTEGER },
    },
    {}
  );
  Balance.associate = (models) => {
    Balance.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };
  return Balance;
};

export default BalanceModel;
