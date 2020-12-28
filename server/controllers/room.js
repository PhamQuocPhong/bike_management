const Room = require('../models/room')
const User = require('../models/user')
const Employee = require('../models/employee')
const UserInRoom = require('../models/user_in_room')
const sequelize = require('../database/db')

let getAllRoomsPaging = async (req, res) => {

	var itemPerPage = req.query.itemPerPage
	var page = req.params.page
	var offset = 0
	if(page == 1){
		offset = 0
	}
	else{
		offset = ((page - 1) * itemPerPage) 
	}

	const rooms = await Room.findAll({
		offset: offset, 
		limit: itemPerPage,
		include: [
			{
				model: UserInRoom,
			},
			{
				attributes: ['id', 'email', 'roleId'],
				model: User,
				include: {
					attributes: ['fullName'],
					model: Employee
				}
			}
		],
	})

	return res.status(200).json({message: 'Retrive success', data: rooms})
}

let joinRoom = async (req, res) => {

	const userId = req.decoded.userId
	var pin = req.body.pin
	var roomId = req.params.id

	try {

		var checkValid = await Room.count({
			where: {
				pin: pin,
				id: roomId
			}
		})

		return res.status(200).json({message: "Join room success", data: checkValid})

	} catch(e) {
		// statements
		console.log(e);
	}
}

let autoJoinRoom = async(req, res) => {

	const userId = req.decoded.userId
	var roomId = req.params.id

	var checkEXist =  await UserInRoom.count({
		where: {
			roomId: roomId,
			userId: userId,
			status: 1,
		}
	})


	if(checkEXist)	{
		return res.status(200).json({message: "Join room success", data: Boolean(checkEXist)})
	}else {
		return res.status(200).json({message: "Can't join room", data: Boolean(checkEXist)})
	}


}

module.exports = {
	getAllRoomsPaging: getAllRoomsPaging,
	joinRoom: joinRoom,
	autoJoinRoom: autoJoinRoom
}