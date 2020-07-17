const express = require('express');
const vehicleController = require('../controllers/vehicle.js')
var router = express.Router()
var multer  = require('multer')


router.get('/', vehicleController.getAllVehicleByType)
router.post('/create', vehicleController.createVehicle)
router.get('/page/:page', vehicleController.getAllVehiclePaging)


router.get('/purchase/page/:page', vehicleController.getAllVehiclePurchasePaging)
router.post('/purchase/update/:id', vehicleController.updateVehiclePurchase)

router.get('/repair/page/:page', vehicleController.getAllVehicleRepairPaging)

router.post('/repair/create', vehicleController.createVehicleRepair)
router.post('/repair/update/:id', vehicleController.updateVehicleRepair)


router.post('/repair/publish/:id', vehicleController.publishVehicleRepair)

module.exports = router