const express = require('express');
const dashboardController = require('../controllers/dashboard.js')
var router = express.Router()


router.get('/', dashboardController.showDashboard)


module.exports = router