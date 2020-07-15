const Sequelize = require('sequelize');
const db = require('../database/db')


const Transaction = db.define('transaction', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  mode: {
    type: Sequelize.ENUM,
    values: ['buy', 'sell'],
  },

  date: {
    type: Sequelize.DATE,
    allowNull: true
  },

  subTotalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },

  taxPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },

  totalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },

  

});


module.exports = db.model('transaction', Transaction);
