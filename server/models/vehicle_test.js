const Sequelize = require('sequelize')
const db = require('../database/db')



const VehicleTest = db.define('vehicleTest', {
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
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  registrationPlate:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  bikeCode:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  bikeStatus:{
    type: Sequelize.ENUM,
    values: ['new', 'normal', 'old', 'waiting'],
    defaultValue: 'waiting'
  },

  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  minPrice :{
     type: Sequelize.DOUBLE,
      allowNull: true
  },
  maxPrice :{
    type: Sequelize.DOUBLE,
      allowNull: true
  },
})


module.exports = db.model('vehicleTest', VehicleTest)
