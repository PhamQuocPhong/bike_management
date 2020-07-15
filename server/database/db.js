const {Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()
// const url = process.env.DATABASE_URL || 'postgres://postgres:muadong@localhost:5432/quanlymuabanxe'
const url = process.env.DATABASE_URL || 'postgres://icxwgbqgbrfvnv:823a2de9e803df9faa7903a44fac0c4b180c91c879ef2e1f33c7343280cda371@ec2-52-70-15-120.compute-1.amazonaws.com:5432/d6t6n840jsl94v'
const db = new Sequelize(url)
module.exports = db
