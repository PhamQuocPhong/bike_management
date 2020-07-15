const Sequelize = require('sequelize');
const db = require('../database/db')


const Role = db.define('role', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description:{
    type: Sequelize.STRING,
    allowNull: true,
  }
});

module.exports = db.model('role', Role);
