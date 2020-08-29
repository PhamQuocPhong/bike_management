const Sequelize = require('sequelize');
const db = require('../database/db')


const VehiclePurchase = db.define('vehiclePurchase', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name :{
      type: Sequelize.STRING,
      allowNull: false
  },

  color :{
    type: Sequelize.STRING,
    allowNull: true
  },

  registrationPlate:{
    type: Sequelize.STRING,
    allowNull: false
  },

  price: { 
    type: Sequelize.DOUBLE,
    allowNull: true,
    defaultValue: 0
  },

  status: {
    type: Sequelize.ENUM,
    values: ['new', 'normal', 'old'],
  },

  image: {
    type: Sequelize.STRING,
    allowNull: true
  },


});


module.exports = db.model('vehiclePurchase', VehiclePurchase);
