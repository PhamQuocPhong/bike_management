const Transaction = require('../models/transaction')
const TransactionDetailSell = require('../models/transaction_detail_sell')
const TransactionDetailBuy = require('../models/transaction_detail_buy')
const Vehicle = require('../models/vehicle')
const VehiclePurchase = require('../models/vehicle_purchase')
const VehicleRepair = require('../models/vehicle_repair')
const ReceptionCustomerSell = require('../models/reception_customer_sell')
const SalesCustomerBuy = require('../models/sales_customer_buy')
const Employee = require('../models/employee')
const Customer = require('../models/customer')


const helperFunctions =  require('../helpers/function')
const helper = require('../helpers/helper')
const { Op } = require("sequelize")
const sequelize = require('../database/db')

let reportTransactions = async (req, res) => {

	var query = req.query
	var param = req.params.mode
	var condition = {
		query: query,
		param: param
	}

	helperFunctions.printTransactionPDF(condition, (response) => {
		var pdf = helperFunctions.callbackPintPDF(response)
		res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
		res.send(pdf)
	})
}

let reportTransactionDetail = async (req, res) => {

	var query = req.query
	var param = req.params.mode
	var condition = {
		query: query,
		param: param
	}


	helperFunctions.printTransactionDetailPDF(condition, (response) => {
		var pdf = helperFunctions.callbackPintPDF(response)
		res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
		res.send(pdf)
	})
}

let reportTransactionView = async(req, res) => {
	var mode = req.params.mode
	var startDate = req.query.startDate ? req.query.startDate : null
	var endDate = req.query.endDate ? req.query.endDate : null
	var month = req.query.month ? req.query.month : null
	var transactionId = req.query.transactionId
	var transactionData = null
	var condition = {}


	if(mode === 'sell'){
		condition.mode = 'sell'

		if(transactionId){
			condition.id = transactionId
		}
		else if((startDate !== null && endDate !== null) || month !== null){
			condition = {
				...condition,  
				[Op.or]: [
					{
						date: {
							[Op.between]: [startDate, endDate]
						}
					},
					{
						[Op.gte]: sequelize.where(sequelize.fn("date_part",'month', sequelize.col("date")), month)
					}
				] 
			}
		}

		transactionData = await Transaction.findAll({
			include: [
					{
						model: TransactionDetailSell,
						include: {
							model: Vehicle
						}
					},

					{
						model: Employee,
					},

					{
						model: Customer,
					}
				],
			where: condition
		})

		res.render('report/transaction/sell', {transactionData})

	}else if(mode === 'buy'){
		condition.mode = 'buy'

		if(transactionId){
			condition.id = transactionId
		}
		if((startDate !== null && endDate !== null) || month !== null){
			condition = { 
				...condition, 
				[Op.or]: [
					{
						date: {
							[Op.between]: [startDate, endDate]
						}
					},
					{
						[Op.gte]: sequelize.where(sequelize.fn("date_part",'month', sequelize.col("date")), month)
					}
				] 
			}
		}

		transactionData = await Transaction.findAll({
			include: [
					{
						model: TransactionDetailBuy,

						include: {
							model: VehiclePurchase,

							include: {
								model: VehicleRepair,
							}

						}	

					},

					{
						model: Employee,
					},

					{
						model: Customer,
					}
				],
			where: condition
		})

		res.render('report/transaction/buy', {transactionData})
	}
}

let reportTransactionDetailView = async (req, res) => {
	var query = req.query
	var mode = req.params.mode
	var  transactionDetailData = null

	if(mode === 'sell' && query.transactionDetailId){
		transactionDetailData = await TransactionDetailSell.findOne({
			include: {
				model: Vehicle,

			},
			where: {
				id: query.transactionDetailId
			}	
		})

		res.render('report/transaction/detail/sell', {transactionDetailData});
	}else if(mode === 'buy' && query.transactionDetailId){
		transactionDetailData = await TransactionDetailBuy.findOne({
			include: {
				model: VehiclePurchase,

				include: {
					model: VehicleRepair,
				}

			},
			where: {
				id: query.transactionDetailId
			}		
		
		})

		res.render('report/transaction/detail/buy', {transactionDetailData});
	}
}




module.exports = {
	reportTransactions: reportTransactions,
	reportTransactionDetail: reportTransactionDetail,
	reportTransactionView: reportTransactionView,
	reportTransactionDetailView: reportTransactionDetailView
}