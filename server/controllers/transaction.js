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
const { Op } = require("sequelize")
const config = require('../config')
const sequelize = require("../database/db")

let createTransaction = async (req, res) => {

	var transactionData = req.body.transaction
	var transactionDetailData = req.body.transactionDetailData

	const t = await sequelize.transaction();
	try {
		var newTransaction = await Transaction.create(transactionData, { transaction: t })
		if(newTransaction){
			if(newTransaction.mode === 'sell'){
				var infoTransaction = req.body.infoTransaction

				transactionDetailData.forEach( async (item, index) => {

					TransactionDetailSell.create({
						quantity: item.quantity,
						unitPrice: item.unitPrice,
						totalPrice: item.totalPrice,
						vehicleId: item.vehicleId,
						transactionId: newTransaction.id
					}, { transaction: t })

					Vehicle.update({valid: config.vehicle.UNVALID}, {
						where: {
							id: item.vehicleId
						}
					})

					var salesCustomerBuyUpadate = await SalesCustomerBuy.update({
						status: 'completed'
					}, {
						where: {
							saleId: infoTransaction.saleId
						},
						returning: true,
	  					plain: true
					}, { transaction: t })

					await t.commit();

					return res.status(200).json({message: 'Payment success!', data: salesCustomerBuyUpadate[1]})

				})

			}else if(newTransaction.mode === 'buy'){

				var receptionCustomerSellId = null
				transactionDetailData.forEach( async (item, index) => {

					receptionCustomerSellId = item.receptionCustomerSellId

					var newVehiclePurchase = await VehiclePurchase.create({
						name: item.name,
						color: item.color,
						registrationPlate: item.registrationPlate,
						code: item.bikeCode,
						price: item.totalPrice,
						status: item.bikeStatus,
						image: item.image,
						receptionCustomerSellId: item.receptionCustomerSellId,
						vehicleTypeId: item.vehicleTypeId
					}, { transaction: t })


					if(newVehiclePurchase){
						VehicleRepair.create({
							 vehiclePurchaseId: newVehiclePurchase.id,
						}, { transaction: t })

						TransactionDetailBuy.create({
							averagePrice: item.averagePrice,
							reducePrice: item.reducePrice,
							totalPrice: item.totalPrice,
							vehiclePurchaseId: newVehiclePurchase.id,
							transactionId: newTransaction.id
						}, { transaction: t })
					}
				})

				var receptionCustomerSellUpdate = await ReceptionCustomerSell.update({
					status: "completed"
					},
					{
					where: {
						id: receptionCustomerSellId
					},
					returning: true,
	  				plain: true
				}, { transaction: t })


				await t.commit();
		
				return res.status(200).json({message: 'Payment success!', data: receptionCustomerSellUpdate[1]})
			}
		}
		
	} catch(error) {
		await t.rollback();
		return res.status(500).json(error)
	}
}

let getTransactionSellPaging = async (req, res) => {
	var itemPerPage = req.query.itemPerPage
	var page = req.params.page
	var startDate = req.query.startDate ? req.query.startDate : null
	var endDate = req.query.endDate ? req.query.endDate : null
	var month = req.query.month ? req.query.month : null
	var offset = 0
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
	}

	var condition = {
		mode: 'sell',
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

	const transactionSells = await Transaction.findAll({
		offset: offset, 
		limit: itemPerPage, 
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
	const counts  = Math.ceil(await Transaction.count({
		where: condition
	}) / itemPerPage ) 

	return res.status(200).json({message: 'Retrieve success', data: transactionSells, pageCounts: counts })
}

let getTransactionBuyPaging = async (req, res) => {
	var page = req.params.page
	var itemPerPage = req.query.itemPerPage
	var startDate = req.query.startDate ? req.query.startDate : null
	var endDate = req.query.endDate ? req.query.endDate : null
	var month = req.query.month ? req.query.month : null
	var offset = 0
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
	}

	var condition = {
		mode: 'buy',
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

	const transactionBuys = await Transaction.findAll({
		offset: offset, 
		limit: itemPerPage, 
		include: [
				{
					model: TransactionDetailBuy,
					include: {
						model: VehiclePurchase,
						include: [
							{
							 model: VehicleRepair,
							}
						]
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
	const counts  = Math.ceil(await Transaction.count({
		where: condition
	}) / itemPerPage ) 


	return res.status(200).json({message: 'Retrieve success', data: transactionBuys, pageCounts: counts })
}


let searchTransaction = async (req, res) => {
	var query = req.query
	var mode = req.params.mode
	var  transactionData = null

	try {
		if(mode === 'sell'){
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
				where: {
					mode: 'sell'
				}
			})
		}else if(mode === 'buy'){
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
				where: {
					mode: 'buy'
				}
			})
		}

		return res.status(200).json({message: 'Retrieve success', data: transactionData })

	} catch(e) {

		console.log(e);
	}
}


module.exports = {
	createTransaction: createTransaction,
	getTransactionSellPaging: getTransactionSellPaging,
	getTransactionBuyPaging: getTransactionBuyPaging,
	searchTransaction: searchTransaction
}