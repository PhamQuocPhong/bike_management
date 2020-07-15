const Sequelize = require('sequelize')
const db = require('../database/db')



const VehicleRepair = db.define('vehicleRepair', {
  // attributes
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: true
  },

  fixPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },

  price: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },

  approveFlg: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },

  fixFlg: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },

  pushlishFlg: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }


})

module.exports = db.model('vehicleRepair', VehicleRepair)
