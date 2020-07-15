const Sequelize = require('sequelize')
const db = require('../database/db')


const TechnicalTest = db.define('technicalTest', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

})

module.exports = db.model('technicalTest', TechnicalTest)
