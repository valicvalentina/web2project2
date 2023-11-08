const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('baza_jnx3', 'baza_jnx3_user', 'hISgqvT4fgoEAL7ZpWASewrGJtfw1mWt', {
  host: 'dpg-cktb4j0168ec73ceo4ng-a.frankfurt-postgres.render.com', // Use the Render database hostname
  dialect: 'postgres',
  port: 5432, // Use the Render database port (5432 by default)
  dialectOptions: {
    ssl: {
      require: true, // This enforces SSL/TLS
      rejectUnauthorized: false, // This allows self-signed certificates (you may adjust this for production)
    },
  }
});

module.exports = sequelize;
