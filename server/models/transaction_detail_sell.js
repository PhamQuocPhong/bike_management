const Sequelize = require('sequelize');
const db = require('../database/db')


const TransactionDetailSell = db.define('transactionDetailSell', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  quantity: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },

  unitPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },

  totalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },

});


module.exports = db.model('transactionDetailSell', TransactionDetailSell);
