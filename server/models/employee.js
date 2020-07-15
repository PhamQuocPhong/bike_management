const Sequelize = require('sequelize')
const db = require('../database/db')

const Employee = db.define('employee', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  
  fullName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  emailPersonal: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  // avatar:{
  //   type: Sequelize.STRING,
  //   allowNull: true,
  // },
})

module.exports =  db.model('employee', Employee)


module.exports.createEmployee = function(newEmployee, callback){

  newEmployee.save(callback)

   return newEmployee
}


