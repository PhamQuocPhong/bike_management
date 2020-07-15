const Sequelize = require('sequelize')
const db = require('../database/db')

const Position = db.define('position', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: true,
  }
})

module.exports =  db.model('position', Position)



