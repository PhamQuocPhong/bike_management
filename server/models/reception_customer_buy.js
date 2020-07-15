const Sequelize = require('sequelize')
const db = require('../database/db')


const ReceptionCustomerBuy = db.define('receptionCustomerBuy', {
  // attributes
 id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
  
})



module.exports = db.model('receptionCustomerBuy', ReceptionCustomerBuy)
