const Sequelize = require('sequelize');
const db = require('../database/db')

const UserNotification = db.define('userNotification', {
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
  type:{
    type: Sequelize.ENUM,
    values: ['email', 'notify', 'message'],
  },

  receiverId:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }

});


module.exports = db.model('userNotification', UserNotification);
