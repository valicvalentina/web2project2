const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize-config');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync()
  .then(() => {
    console.log('User table created');
  })
  .catch((error) => {
    console.error('Error creating User table:', error);
  });

module.exports = User;
