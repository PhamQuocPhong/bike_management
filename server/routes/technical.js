const express = require('express');
const Technical = require('../controllers/technical.js')
var router = express.Router()

router.get('/test/page/:page', Technical.getTechnicalTestPaging)

router.get('/vehicle-test', Technical.getAllVehicleTests)

router.post('/vehicle-test/:id', Technical.updateVehicleTest)


router.post('/repair/create', Technical.createTechnicalRepair)

router.get('/vehicle-repair/:id', Technical.getAllTechnicalRepairByVehicleRepairId)

router.get('/repair/page/:page', Technical.getAllTechnicalRepairPaging)

router.post('/repair/update/:id', Technical.updateTechnicalRepair)

module.exports = router