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


const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-quocphong@gmail.com"

let getAllReceptionCustomerSell = async (req, res) => {

	const receptionCustomerSellData = await ReceptionCustomerSell.findAll({
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

	return res.status(200).json(receptionCustomerSellData)
}


let createReceptionCustomerSell = async (req, res) => {

	var customerData = req.body.customer
	var vehicleTestData = req.body.vehicleTests
	var employeeTest = req.body.employeeTest
	var accessToken = req.body.token || req.query.token || req.headers["x-access-token"]
	// var decoded = await jwtHelper.verifyToken(accessToken, accessTokenSecret)
	var decoded = req.decoded
	var userId = decoded.userId
	var customerId = null
	var findCustomer = await Customer.findOne({
		where: {
			phoneNumber: customerData.phoneNumber
		}
	})

	try{
		if(vehicleTestData.length > 0)
		{
			if(!findCustomer){
				var newCustomer = await Customer.create({
					name: customerData.name,
					phoneNumber: customerData.phoneNumber,
					email: customerData.email,
					address: customerData.address,
				})
					customerId = newCustomer.id
				}else{
					customerId = findCustomer.id
				}
		
				var newReceptionCustomerSell = await ReceptionCustomerSell.create({
					employeeId: userId,
					customerId: customerId
				})
		
				var newTechnicalTest = await TechnicalTest.create({
					employeeId: employeeTest.id
				})
		
				
				if(vehicleTestData.length > 0){
					for(var i = 0; i < vehicleTestData.length; i++){
						var urlImage = '';
						await AwsService.uploadImageBase64(vehicleTestData[i].imageSrc, (url) => {
							urlImage = AwsService.getCallbackURL(url)
						})
						await VehicleTest.create({
							image: urlImage,
							name: vehicleTestData[i].name,
							color: vehicleTestData[i].color,
							registrationPlate: vehicleTestData[i].registrationPlate,
							bikeCode: vehicleTestData[i].bikeCode,
							bikeStatus: vehicleTestData[i].bikeStatus,
							minPrice: vehicleTestData[i].minPrice,
							maxPrice: vehicleTestData[i].maxPrice,
							technicalTestId: newTechnicalTest.id,
							receptionCustomerSellId: newReceptionCustomerSell.id,
							vehicleTypeId:  vehicleTestData[i].vehicleTypeId
						})
					}
				}
				
		
		
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


	try{
		if(!findCustomer){
			var newCustomer = await Customer.create({
				name: data.name,
				phoneNumber: data.phoneNumber,
				email: data.email,
				address: data.address,
			})
			customerId = newCustomer.id
		}else{
			customerId = findCustomer.id
		}

		var newReceptionCustomerBuy = await ReceptionCustomerBuy.create({
			employeeId: userId,
		})

		var newSales = await Sales.create()
		var newSalesCustomerBuy = await SalesCustomerBuy.create({
			customerRequire: data.customerRequire,
			status: progressTransaction.default,
			customerId: customerId,
			saleId: newSales.id,
			receptionCustomerBuyId: newReceptionCustomerBuy.id
		})

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

		if(newReceptionCustomerBuy){
			return res.status(200).json({message: 'Create Success!', data: returnRecord})
		}

	}catch(error){
		return res.status(500).json(error)
	}

}


let getAllReceptionCustomerBuy = async (req, res) => {


	const receptionCustomerBuyData = await ReceptionCustomerBuy.findAll({
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

	return res.status(200).json({message: 'Retrive success', data: receptionCustomerBuyData})
}

let getReceptionCustomerBuyPaging = async (req, res) => {

	var itemPerPage = req.query.itemPerPage
	var page = req.params.page
	var offset = 0
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
	}

	const receptionCustomerBuyData = await ReceptionCustomerBuy.findAll({
		offset: offset, 
		limit: itemPerPage, 
		include: [
			{
				model: Customer,
			},

			{
				model: Employee,
			},
		]
	})
	const counts  = Math.ceil(await ReceptionCustomerBuy.count() / itemPerPage ) 

	return res.status(200).json({message: 'Retrive success', data: receptionCustomerBuyData, pageCounts: counts })
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
	getAllReceptionCustomerSell: getAllReceptionCustomerSell,
	createReceptionCustomerSell: createReceptionCustomerSell,

	getAllReceptionCustomerBuy: getAllReceptionCustomerBuy,
	getReceptionCustomerBuyPaging: getReceptionCustomerBuyPaging,
	createReceptionCustomerBuy: createReceptionCustomerBuy,
	updateReceptionCustomerBuy: updateReceptionCustomerBuy
}