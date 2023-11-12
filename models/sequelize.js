const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('baza_jnx3', 'baza_jnx3_user', 'hISgqvT4fgoEAL7ZpWASewrGJtfw1mWt', {
  host: 'dpg-cktb4j0168ec73ceo4ng-a.frankfurt-postgres.render.com', 
  dialect: 'postgres',
  port: 5432, 
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false, 
    },
  }
});

module.exports = sequelize;
