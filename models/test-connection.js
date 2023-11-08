const { Sequelize } = require('sequelize');
const config = require('./config.json'); // Import your Sequelize configuration

const sequelize = new Sequelize(
  config.development, // Replace with the appropriate environment (e.g., development, test, production)
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the testConnection function to test the connection
testConnection();
