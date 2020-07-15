const express = require('express');
const vehicleTypeController = require('../controllers/vehicle_type.js')
var router = express.Router()


router.get('/', vehicleTypeController.getAll)

module.exports = router