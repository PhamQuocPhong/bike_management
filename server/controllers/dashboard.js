const VehiclePurchase = require('../models/vehicle_purchase')
const Employee = require('../models/employee')
const Customer = require('../models/customer')
const Vehicle = require('../models/vehicle')
const VehicleType = require('../models/vehicle_type')
const Transaction = require('../models/transaction')
const TransactionDetailSell = require('../models/transaction_detail_sell')
const TransactionDetailBuy = require('../models/transaction_detail_buy')

const helperFunctions = require('../helpers/function')
const helper = require('../helpers/helper')
const moment = require('moment'); 
const { Op } = require("sequelize")
const sequelize = require('../database/db')

let getAllVehiclesSold = async (req, res) => {
	return await Vehicle.count({
		where: {
			valid: 0
		}
	})
}

let getAllCustomers = async (req, res) =>{
	return await Customer.count()
}

let getAllOrders = async(req, res) => {
	return await Transaction.count()
}

let getAverageRevenuePerMonth = async(req, res) => {

	var revenuePerMonth = 0
	var tranDetailSells = await TransactionDetailSell.findAll({
		include: {
			model: Vehicle
		}
	})

	tranDetailSells.forEach(item => {
		revenuePerMonth += eval(item.totalPrice - item.vehicle.buyPrice)
	})
	return helper.formatNumber(revenuePerMonth)
} 

let getRevenueChart = async(req, res) => {
	var chartData = {}
	var monthArr = []
	var revenueArr = []

	for (var month  in Array.from(Array(12))){

		var transactionDetailSells = await TransactionDetailSell.findAll({
			include: [
			{
				model: Transaction,
				where: {
					mode: "sell",
					[Op.and]: [
						sequelize.where(sequelize.fn("date_part",'month', sequelize.col("date")), {
				            [Op.eq]: parseInt(month) + 1
				        }),

				        sequelize.where(sequelize.fn("date_part",'year', sequelize.col("date")), {
				            [Op.eq]: 2020
				        })
					]
				}
			},
				{
					model: Vehicle
				}
			],
		})

		var revenuePerMonth = 0
		transactionDetailSells.forEach(item => {
			revenuePerMonth += eval(item.totalPrice - item.vehicle.buyPrice)
		})
		monthArr.push(parseInt(month) + 1)
		revenueArr.push(revenuePerMonth)
	}

	chartData = {
		month: monthArr,
		revenue: revenueArr
	}

	return chartData
}

let getVehicleChart = async(req, res) => {

	var allVehicles = await Vehicle.count()

	var getBikesSold = await Vehicle.count({
		where: {
			vehicleTypeId: 1,
			valid: 0,
			[Op.and]: [
				sequelize.where(sequelize.fn("date_part",'year', sequelize.col("createdAt")), {
		            [Op.eq]: 2020
		        })
		    ]
		}
	})

	var getBikesBuy= await Vehicle.count({
		where: {
			vehicleTypeId: 1,
			valid: 1,
			[Op.and]: [
				sequelize.where(sequelize.fn("date_part",'year', sequelize.col("createdAt")), {
		            [Op.eq]: 2020
		        })
		    ]
		}
	})

	var getCarsSold = await Vehicle.count({
		where: {
			vehicleTypeId: 2,
			valid: 0,
			[Op.and]: [
				sequelize.where(sequelize.fn("date_part",'year', sequelize.col("createdAt")), {
		            [Op.eq]: 2020
		        })
		    ]
		}
	})

	var getCarsBuy = await Vehicle.count({
		where: {
			vehicleTypeId: 2,
			valid: 1,
			[Op.and]: [
				sequelize.where(sequelize.fn("date_part",'year', sequelize.col("createdAt")), {
		            [Op.eq]: 2020
		        })
		    ]
		}
	})

	return Array(
			eval(getBikesBuy / allVehicles).toFixed(2) * 100,
			eval(getBikesSold / allVehicles).toFixed(2) * 100,
			eval(getCarsBuy / allVehicles).toFixed(2) * 100,
			eval(getCarsSold / allVehicles).toFixed(2) * 100,
		)
	
}

let getTop5Customers = async(req, res) => {

	var data = await Transaction.findAll({
		attributes: ['customerId', [sequelize.fn('count', sequelize.col('customerId')), 'qty']], 
		group: ['customerId'],
		offset: 0, 
		limit: 5,
		order: [[sequelize.literal('qty'), 'DESC']],
		raw : true
	})

	return new Promise(async (resolve, reject) => {
		var customerArr = []
		for(var i = 0; i < data.length; i++){
			 var findCustomer = await  Customer.findOne({
				where: {
					id:data[i].customerId
				},
				raw: true
			})
			customerArr.push(findCustomer)
		}
     	resolve(customerArr)
    });
}

let showDashboard = async (req, res) => {


	var data = {
		vehiclesSold: await getAllVehiclesSold(),
		allCustomer: await  getAllCustomers(),
		allOrdes: await  getAllOrders(),
		revenuePerMonth: await getAverageRevenuePerMonth(),
		revenueChartData: await getRevenueChart(),
		vehicleChart: await getVehicleChart(),
		topCustomers: await getTop5Customers()
	}

	return res.status(200).json({message: "success", data: data})
}

module.exports = {
	showDashboard: showDashboard,
}