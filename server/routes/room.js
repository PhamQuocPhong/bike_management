const express = require('express');
const roomController = require('../controllers/room.js')
var router = express.Router()


router.get('/page/:page', roomController.getAllRoomsPaging)

router.post('/join/:id', roomController.joinRoom)

module.exports = router