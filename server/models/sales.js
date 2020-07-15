const Sequelize = require('sequelize');
const db = require('../database/db')


const Sales = db.define('sales', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
});

module.exports = db.model('sales', Sales);
