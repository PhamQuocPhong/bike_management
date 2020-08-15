const Sequelize = require('sequelize');
const db = require('../database/db')

const Room = db.define('room', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  pin: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },


  name:{
    type: Sequelize.STRING,
    allowNull: false,
  },  

  date: {
    type: Sequelize.DATE,
    allowNull: true
  },

  maximum: {
    type: Sequelize.INTEGER,
    allowNull: true
  }

});


module.exports = db.model('room', Room);
