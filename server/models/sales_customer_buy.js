const Sequelize = require('sequelize')
const db = require('../database/db')


const SalesCustomerBuy = db.define('salesCustomerBuy', {
  // attributes
 id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  customerRequire:{
    type: Sequelize.STRING,
    allowNull: false,
  },

  contactFlg:{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  // trạng thái đã giao dịch hay chưa
  status: {
      type: Sequelize.ENUM,
      values: ['waiting', 'confirm', 'completed', 'cancel'],
      defaultValue: 'waiting'
  },



})



module.exports = db.model('salesCustomerBuy', SalesCustomerBuy)
