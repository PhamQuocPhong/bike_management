const VehicleTest = require('../models/vehicle_test')
const ReceptionCustomerSell = require('../models/reception_customer_sell')
const ReceptionCustomerBuy = require('../models/reception_customer_buy')
const TechnicalTest = require('../models/technical_test')
const Customer = require('../models/customer')
const Employee = require('../models/employee')
const VehicleType = require('../models/vehicle_type')
const enumData = require("../helpers/enum.data")
const SalesCustomerBuy = require('../models/sales_customer_buy')
const Sales = require('../models/sales')
const AwsService = require('../services/aws')
const helperFunctions = require('../helpers/function')
const config = require('../config')
const { Op } = require("sequelize")
const sequelize = require("../database/db")

let getReceptionCustomerSellPaging = async(req, res) => {

	const userId = req.decoded.userId
	var employeeInfo = await helperFunctions.findEmployee(userId)
	var conditionGetData = {}
	var itemPerPage = req.query.itemPerPage
	var page = req.params.page
	var offset = 0
	
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
	}

	if(employeeInfo.positionId != config.employeePosition.MANAGE){
		conditionGetData = {
			[Op.or]: [
				{employeeId: employeeInfo.id}, 
			]
		}
	}


	try {
		const receptionCustomerSellData = await ReceptionCustomerSell.findAll({
			offset: offset, 
			limit: itemPerPage, 
			include: [
				{
					model: Customer,
				},

				{
					model: Employee,
				},

				{
					model: VehicleTest,
					include: {
						model: VehicleType
					}
				},
			],
			where: conditionGetData
		})

		const counts  = Math.ceil(await ReceptionCustomerSell.count({ where: conditionGetData} ) / itemPerPage ) 
		return res.status(200).json({message: 'Retrive success', data: receptionCustomerSellData, pageCounts: counts })

	} catch(error) {
		return res.status(500).json(error)
	}

}


let createReceptionCustomerSell = async (req, res) => {

	var customerData = req.body.customer
	var vehicleTestData = req.body.vehicleTests
	var employeeTest = req.body.employeeTest
	var typeUpload = "bikes"
	var decoded = req.decoded
	var userId = decoded.userId
	var customerId = null
	var findCustomer = await Customer.findOne({
		where: {
			phoneNumber: customerData.phoneNumber
		}
	})

	const t = await sequelize.transaction();
	try{
		if(vehicleTestData.length > 0)
		{
			if(!findCustomer){
				var newCustomer = await Customer.create({
					name: customerData.name,
					phoneNumber: customerData.phoneNumber,
					email: customerData.email,
					address: customerData.address,
				}, { transaction: t })
					customerId = newCustomer.id
				}else{
					customerId = findCustomer.id
				}
		
				var newReceptionCustomerSell = await ReceptionCustomerSell.create({
					employeeId: userId,
					customerId: customerId
				}, { transaction: t })
		
				var newTechnicalTest = await TechnicalTest.create({
					employeeId: employeeTest.id
				}, { transaction: t })
		
				
				if(vehicleTestData.length > 0){
					for(var i = 0; i < vehicleTestData.length; i++){
						var urlImage = '';
						await AwsService.uploadImageBase64(vehicleTestData[i].imageSrc, typeUpload, (url) => {
							urlImage = AwsService.getCallbackURL(url)
						})
						await VehicleTest.create({
							image: urlImage,
							name: vehicleTestData[i].name,
							color: vehicleTestData[i].color,
							registrationPlate: vehicleTestData[i].registrationPlate,
							minPrice: vehicleTestData[i].minPrice,
							maxPrice: vehicleTestData[i].maxPrice,
							technicalTestId: newTechnicalTest.id,
							receptionCustomerSellId: newReceptionCustomerSell.id,
							vehicleTypeId:  vehicleTestData[i].vehicleTypeId
						}, { transaction: t })
					}
				}

				await t.commit();
			
				const receptionCustomerSellData = await ReceptionCustomerSell.findOne({
					where: {
						id: newReceptionCustomerSell.id
					},
					include: [
						{
							model: Customer,
						},
		
						{
							model: Employee,
						},
		
						{
							model: VehicleTest,
							include: {
								model: VehicleType
							}
						},
					]
				})
		
				return res.status(200).json({message: "Create Success!", data: receptionCustomerSellData})
		}
		else
		{
			return res.status(400).json({message: "Not yet added vehicles"});
		}
		
	}catch(error){
		await t.rollback();
		return res.status(500).json(error)
	}
}

let createReceptionCustomerBuy = async (req, res) => {

	var data = req.body
	var progressTransaction = enumData.data.progressTransaction
	var decoded = req.decoded
	var userId = decoded.userId
	var customerId = null
	var findCustomer = await Customer.findOne({
		where: {
			phoneNumber: data.phoneNumber
		}
	})
	const t = await sequelize.transaction();

	try{
		if(!findCustomer){
			var newCustomer = await Customer.create({
				name: data.name,
				phoneNumber: data.phoneNumber,
				email: data.email,
				address: data.address,
			}, { transaction: t })
			customerId = newCustomer.id
		}else{
			customerId = findCustomer.id
		}

		var newReceptionCustomerBuy = await ReceptionCustomerBuy.create({
			employeeId: userId,
		}, { transaction: t })

		var newSales = await Sales.create({
			employeeId: null
		}, { transaction: t })

		var newSalesCustomerBuy = await SalesCustomerBuy.create({
			customerRequire: data.customerRequire,
			status: progressTransaction.default,
			customerId: customerId,
			saleId: newSales.id,
			receptionCustomerBuyId: newReceptionCustomerBuy.id
		}, { transaction: t })

		await t.commit();

		var returnRecord = await ReceptionCustomerBuy.findOne({
			where: {
				id: newReceptionCustomerBuy.id
			},
			include: [
				{
					model: SalesCustomerBuy,
					include: [
						{
							model: Customer
						}
					]
				},
			]
		})

		return res.status(200).json({message: 'Create Success!', data: returnRecord})
		

	}catch(error){
		await t.rollback();
		return res.status(500).json(error)
	}

}

let getReceptionCustomerBuyPaging = async (req, res) => {

	const userId = req.decoded.userId
	var employeeInfo = await helperFunctions.findEmployee(userId)
	var conditionGetData = {}
	var itemPerPage = req.query.itemPerPage
	var page = req.params.page
	var offset = 0
	
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
	}

	if(employeeInfo.positionId != config.employeePosition.MANAGE){
		conditionGetData = {
			[Op.or]: [
				{employeeId: employeeInfo.id}, 
			]
		}
	}

	try {
			
		const receptionCustomerBuyData = await ReceptionCustomerBuy.findAll({
			offset: offset, 
			limit: itemPerPage, 
			include: [
				{
					model: SalesCustomerBuy,
					include: [
						{
							model: Customer
						}
					]
				}
			],
			where: conditionGetData
		})

		const counts  = Math.ceil(await ReceptionCustomerBuy.count({ where: conditionGetData} ) / itemPerPage ) 

		return res.status(200).json({message: 'Retrive success', data: receptionCustomerBuyData, pageCounts: counts })

	} catch(error) {
		return res.status(500).json(error)
	}

}

let updateReceptionCustomerBuy = async (req, res) => {

	var data = req.body
	var receptionCustomerBuyId = req.params.id
	var saleCustomerBuy = data.salesCustomerBuy
	var customer = saleCustomerBuy.customer 
	var decoded = req.decoded
	var userId = decoded.userId	

	try{
		await SalesCustomerBuy.update(saleCustomerBuy, {
			where: {
				id : saleCustomerBuy.id
			}
		})

		await Customer.update(customer, {
			where: {
				id: customer.id
			}
		})

	
		var returnRecord = await ReceptionCustomerBuy.findOne({
			where: {
				id: receptionCustomerBuyId
			},
			include: [
				{
					model: SalesCustomerBuy,
					include: [
						{
							model: Customer
						}
					]
				}
			]
		})	

		return res.status(200).json({message: 'Update success', data: returnRecord})

	}catch(error){
		return res.status(500).json(error)
	}


}


module.exports = {
	getReceptionCustomerSellPaging: getReceptionCustomerSellPaging,
	createReceptionCustomerSell: createReceptionCustomerSell,

	getReceptionCustomerBuyPaging: getReceptionCustomerBuyPaging,
	createReceptionCustomerBuy: createReceptionCustomerBuy,
	updateReceptionCustomerBuy: updateReceptionCustomerBuy
}