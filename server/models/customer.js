const Sequelize = require('sequelize')
const db = require('../database/db')


const Customer = db.define('customer', {
  // attributes
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address:{
    type: Sequelize.STRING,
    allowNull: true,
  }
})

module.exports = db.model('customer', Customer)
