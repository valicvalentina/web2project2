const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const SensitiveInfo = sequelize.define('SensitiveInfo', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    financialData: {
      type: Sequelize.JSON, 
    },
    contactInfo: {
      type: Sequelize.JSON, 
    },
  });  
  module.exports = SensitiveInfo;