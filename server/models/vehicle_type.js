const Sequelize = require('sequelize');
const db = require('../database/db')
//Loại xe
const TypeVehicle = db.define('vehicleType', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name:{
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = db.model('vehicleType', TypeVehicle);
