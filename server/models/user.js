const Sequelize = require('sequelize');
const db = require('../database/db')

const User = db.define('user', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false,
  },  
  password:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  providerId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  providerType: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  avatar: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  verifyFlg: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: true,
  }
});

module.exports = db.model('user', User);
