const {Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()
// const url = process.env.DATABASE_URL || 'postgres://postgres:muadong@localhost:5432/quanlymuabanxe'
const url = process.env.DATABASE_URL || 'postgres://postgres:muadong@localhost:5432/quanlymuabanxecu'
const db = new Sequelize(url)
module.exports = db
