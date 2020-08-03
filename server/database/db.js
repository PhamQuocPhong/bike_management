const {Sequelize, DataTypes } = require('sequelize')
const path = require( "path" )
require('dotenv').config({path: path.resolve('../.env')})


const url = process.env.DATABASE_URL || 'postgres://postgres:muadong@localhost:5432/quanlymuabanxe'
const db = new Sequelize(url, {
	dialectOptions: {
        useUTC: false //for reading from database
    },
    timezone: '+07:00' 
})
module.exports = db
