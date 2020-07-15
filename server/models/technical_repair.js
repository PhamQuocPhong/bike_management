const Sequelize = require('sequelize');
const db = require('../database/db')


const TechnicalRepair = db.define('technicalRepair', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  //tên linh kiện
  accessory:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  finishFlg :{
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
  },
  price :{
    type: Sequelize.DOUBLE,
    allowNull: true
  },
  startDate :{
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  endDate :{
    type: Sequelize.DATEONLY,
    allowNull: true
  },
  type :{
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
});


module.exports = db.model('technicalRepair', TechnicalRepair);
