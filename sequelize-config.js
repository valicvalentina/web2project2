const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('webl2', 'postgres', 'asdf54321', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
