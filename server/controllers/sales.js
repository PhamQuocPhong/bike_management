const Customer = require('../models/customer')
const Employee = require('../models/employee')
const enumData = require("../helpers/enum.data")
const SalesCustomerBuy = require('../models/sales_customer_buy')
const VehicleSuggest = require('../models/vehicle_suggest')
const Sales = require('../models/sales')
const Vehicle = require('../models/vehicle')
const sendMailService = require("../services/email")
const config = require('../config')
const sequelize = require("../database/db")

let getAllSales = async (req, res) => {

	const salesData = await Sales.findAll({
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

	return res.status(200).json({message: 'Retrieve success', data: salesData})
}

let getAllSalesPaging = async (req, res) => {
	
	var itemPerPage = req.query.itemPerPage
	var page = req.params.page
	var offset = 0
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
	}

	const sales = await Sales.findAll({
		offset: offset, 
		limit: itemPerPage, 
		include: [
				{
					model: SalesCustomerBuy,
					include: [
						{
							model: Customer
						},
						{
							model: VehicleSuggest,
							include: {
								model: Vehicle
							}
						}
					]
				}
			]
	})
	const counts  = Math.ceil(await Sales.count() / itemPerPage ) 

	return res.status(200).json({message: 'Retrive success', data: sales, pageCounts: counts })
}

let suggestVehiclesForCustomer = async (req, res) => {

	var userId = req.decoded.userId
	var sales = req.body.sales
	var salesCustomerBuy = sales.salesCustomerBuy
	var vehicleSelected = req.body.vehicleSelected

	const t = await sequelize.transaction();
	try {

		await Sales.update(
			{
				employeeId: userId
			}, 
			{	where: {
					id: sales.id
				}
			}, 
			{ 
				transaction: t 
			}
		)
			
		var salesCustomerBuyUpdate = await SalesCustomerBuy.update({
			customerRequire: salesCustomerBuy.customerRequire,
			contactFlg: config.sales.CONTACTED_FLG,
			status: 'confirm'
		}, 
		{	where: {
				id: salesCustomerBuy.id
			},
		}, { transaction: t })


		for(var i = 0; i < vehicleSelected.length; i ++){
			var vehicleSuggestStore = await VehicleSuggest.findOrCreate({
				defaults: { 
					vehicleId: vehicleSelected[i].id,
					salesCustomerBuyId: salesCustomerBuy.id
				},
	  			where: { 
	  				salesCustomerBuyId: salesCustomerBuy.id,
	  				vehicleId: vehicleSelected[i].id
	  			}
			}, { transaction: t })	
		}

		await t.commit();

		var returnSales = await Sales.findOne({
			where: {
				id: sales.id
			},
			include: {
				model: SalesCustomerBuy, 
					include: {
						model: VehicleSuggest,
						include: {
							model: Vehicle
						}
					}
				
			}
		})

		return res.json({message: "Sucess!", data: returnSales})

	} catch(error) {
		await t.rollback();
		return res.status(500).json(error)
	}

}

let contactCustomer = async (req, res) => {
	var contactFlg = req.body.contactFlg
	var customer = req.body.customer
	var id = req.params.id

	try{

		const record = await SalesCustomerBuy.update({contactFlg}, {
			where: {
				saleId: id
			},
			returning: true,
			plain: true
		})

		if(record){
			var from = 'zipzizza20@gmail.com'
			var mailTo = customer.email
			var subject = 'Confirm Requirement'
			await sendMailService.sendMailContactCustomer(from, mailTo, subject, customer)
			return res.json({message: "Sucess!", data: record[1]})
		}

	}catch(error){
		return res.status(500).json(error)
	}

}


module.exports = {
	getAllSales: getAllSales,
	getAllSalesPaging: getAllSalesPaging,
	suggestVehiclesForCustomer: suggestVehiclesForCustomer,
	contactCustomer: contactCustomer
}
