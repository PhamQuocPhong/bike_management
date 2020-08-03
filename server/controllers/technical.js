const VehicleTest = require('../models/vehicle_test')
const VehicleType = require('../models/vehicle_type')
const TechnicalTest = require('../models/technical_test')
const TechnicalRepair = require('../models/technical_repair')
const VehicleRepair = require('../models/vehicle_repair')
const ReceptionCustomerSell = require('../models/reception_customer_sell')
const Employee = require('../models/employee')
const { Op } = require('sequelize')
const POSITION_MANAGE_ID = 1

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-quocphong@gmail.com"
const helperFunctions = require('../helpers/function')

let getTechnicalTestPaging = async (req, res) => {

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

	if(employeeInfo.positionId != POSITION_MANAGE_ID){
		conditionGetData = {
			[Op.or]: [
				{employeeId: employeeInfo.id}, 
			]
		}
	}

	try {
		
		const technicalTestData = await TechnicalTest.findAll({	
			include: [
				{
					model: VehicleTest,
					include: {
						model: VehicleType
					}
				},
			],

			where: conditionGetData
		})


		const counts  = Math.ceil(await TechnicalTest.count({ where: conditionGetData} ) / itemPerPage ) 
		return res.status(200).json({message: 'Retrieve success', data: technicalTestData, pageCounts: counts })

	} catch(e) {

		return res.status(500).json(error)
	}

}

let getAllVehicleTests = async (req, res) => {


	const userId = req.decoded.userId
	var employeeInfo = await helperFunctions.findEmployee(userId)

	try{

		const vehicleTestData = await VehicleTest.findAll({
			include: [
				{
					model: TechnicalTest,
				},

				{
					model: VehicleType,
				},
			]
		})

		return res.status(200).json({message: 'Retrieve success', data: vehicleTestData})
	}catch(error){
		return res.status(500).json(error)
	}
	
}


let getAllTechnicalRepairPaging = async (req, res) => {

	const userId = req.decoded.userId
	var employeeInfo = await helperFunctions.findEmployee(userId)
	var itemPerPage = req.query.itemPerPage
	var page = req.params.page
	var offset = 0
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
	}


	var conditionGetData = {}
	if(employeeInfo.positionId != POSITION_MANAGE_ID){
		conditionGetData = {
			[Op.or]: [
				{employeeId: employeeInfo.id}, 
			]
		}
	}

	try{
		const techinicalRepairs = await TechnicalRepair.findAll({
			offset: offset, 
			limit: itemPerPage, 
			include: [
					{
						model: VehicleRepair,
					},
					{
						model: Employee,
					}
			],
			where: conditionGetData
		})


		const counts  = Math.ceil(await TechnicalRepair.count({ where: conditionGetData} ) / itemPerPage ) 
		return res.status(200).json({message: 'Retrieve success', data: techinicalRepairs, pageCounts: counts })

	}catch(error){
		return res.status(500).json(error)
	}	

}


let updateVehicleTest = async (req, res) => {

	var vehicalTestId = req.params.id
	var vehicleTestData = req.body
	try{	
		await VehicleTest.update(vehicleTestData, {
			where: {
				id: vehicalTestId
			},
		}).then(async () => {

			var checkConfirm = await helperFunctions.checkConfirmReception(vehicleTestData.receptionCustomerSellId)
			var confirmStatus = "waiting"
			if(checkConfirm && (vehicleTestData.bikeStatus && vehicleTestData.bikeStatus != "waiting")){
				confirmStatus = "confirm"
			}
			await ReceptionCustomerSell.update({
					status: confirmStatus
				},
				{
				where: {
					id: vehicleTestData.receptionCustomerSellId,

				},
			})

			var returnRecord = await VehicleTest.findOne({
				where: {
					id: vehicalTestId
				},
				include: {
					model: VehicleType
				}
			})

			return res.status(200).json({message: "Update Success!", data: returnRecord})
		})

	}catch(error){
		console.log(error)
	}
}

let getAllTechnicalRepairByVehicleRepairId = async (req, res) => {

	const VehicleRepairId = req.params.vehicleRepairId

	try {
		const data = await TechnicalRepair.findAll({
			include: [
					{
						model: VehicleRepair,
					},
					{
						model: Employee,
					}
			]
		})

		return res.status(200).json({message: "Retrieve Success!", data: data})
	} catch(e) {
		console.log(e);
	}
}

let createTechnicalRepair = async (req, res) => {
	const data = req.body
	try {
		newTechnicalRepair = await TechnicalRepair.create(data)
		if(newTechnicalRepair){
			var returnRecord = await TechnicalRepair.findOne({
				where: {
					id: newTechnicalRepair.id
				},
				include: [{
						model: VehicleRepair
					},
					{
						model: Employee
					}
				]		
			})
		}
		return res.status(200).json({message: 'Create success!', data: returnRecord})
	} catch(error) {

		return res.status(500).json(error)
	}
}

let updateTechnicalRepair = async (req, res) => {
	const data = req.body
	const techinicalRepairId = req.params.id
	const vehicleRepairId = data.vehicleRepairId


	try {
		await TechnicalRepair.update(data, {
			where: {
				id: techinicalRepairId
			}
		}).then(async (response) => {

			if(response){

				var checkFixed = await helperFunctions.checkFixedVehicleRepair(vehicleRepairId)
				var calcFixedRepairPrice = await helperFunctions.calcFixedRepairPrice(vehicleRepairId)

				var progessFixFlg = 0 
				if(checkFixed){	
					progessFixFlg = 1
				}
				VehicleRepair.update({ fixFlg: progessFixFlg, fixPrice: calcFixedRepairPrice }, { where: { id: vehicleRepairId} })

				var returnRecord = await TechnicalRepair.findOne({
					where: {
						id: techinicalRepairId
					},
					include: [{
							model: VehicleRepair
						},
						{
							model: Employee
						}
					]		
				})
				return res.status(200).json({message: 'Update success!', data: returnRecord})
			}
		})
	} catch(error) {
		return res.status(500).json(error)
	}
}

module.exports = {
	getTechnicalTestPaging: getTechnicalTestPaging,
	getAllVehicleTests: getAllVehicleTests,
	updateVehicleTest: updateVehicleTest,
	getAllTechnicalRepairPaging: getAllTechnicalRepairPaging,
	createTechnicalRepair: createTechnicalRepair,
	getAllTechnicalRepairByVehicleRepairId: getAllTechnicalRepairByVehicleRepairId,
	updateTechnicalRepair: updateTechnicalRepair
}