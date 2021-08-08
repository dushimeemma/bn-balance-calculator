const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
    },
    {}
  );
  User.associate = (models) => {
    User.hasMany(models.Balance, { foreignKey: 'user_id' });
  };
  return User;
};

export default UserModel;
