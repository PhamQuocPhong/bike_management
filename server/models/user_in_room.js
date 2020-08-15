const Sequelize = require('sequelize');
const db = require('../database/db')

const UserInRoom = db.define('userInRoom', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  status: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  checkIn: {
    type: Sequelize.DATE,
    allowNull: true
  },

  checkOut: {
    type: Sequelize.DATE,
    allowNull: true
  }

});


module.exports = db.model('userInRoom', UserInRoom);
