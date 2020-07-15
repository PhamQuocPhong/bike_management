const Sequelize = require('sequelize');
const db = require('../database/db')


//Id là mã xe 
const ReceptionCustomerSell = db.define('receptionCustomerSell', {
  // attributes
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},

	// trạng thái đã giao dịch hay chưa
    status: {
	    type: Sequelize.ENUM,
    	values: ['waiting', 'confirm', 'completed', 'cancel'],
    	defaultValue: 'waiting'
 	},

});


module.exports = db.model('receptionCustomerSell', ReceptionCustomerSell);
