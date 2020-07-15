const Sequelize = require('sequelize');
const db = require('../database/db')


const Vehicle = db.define('vehicle', {
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
  price: { 
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  
  registrationPlate:{
    type: Sequelize.STRING,
    allowNull: false
  },

  code: {
    type: Sequelize.STRING,
    allowNull: false
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  image: {
    type: Sequelize.STRING,
    allowNull: true
  },

  fixPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },


  buyPrice: {
    type: Sequelize.DOUBLE,
    allowNull: true
  },


  valid: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },

  description:{
    type: Sequelize.STRING,
    allowNull: true,
  }

});


module.exports = db.model('vehicle', Vehicle);
