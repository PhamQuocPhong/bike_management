const Sequelize = require('sequelize');
const db = require('../database/db')


const TransactionDetailBuy = db.define('transactionDetailBuy', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  averagePrice: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },

  reducePrice: {
       type: Sequelize.DOUBLE,
    allowNull: true,
  },

  totalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true,
  },

});


module.exports = db.model('transactionDetailBuy', TransactionDetailBuy);
