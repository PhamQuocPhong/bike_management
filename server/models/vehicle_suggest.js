const Sequelize = require('sequelize')
const db = require('../database/db')



const VehicleSuggest = db.define('vehicleSuggest', {
  // attributes
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  selected: {
  	type: Sequelize.BOOLEAN,
    allowNull: true
  }

})

module.exports = db.model('vehicleSuggest', VehicleSuggest)
