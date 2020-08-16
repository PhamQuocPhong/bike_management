const sendMailService = require('./services/email')
const UserNotification = require('./models/user_notification')
const User = require('./models/user')
const Employee = require('./models/employee')
const Room = require('./models/room')
const helper = require('./helpers/helper')
const config = require('./config')
// const redis = require("redis");
// const client = redis.createClient({ detect_buffers: true });

var users = {}

let addUser = (socket) => {

	socket.on('ADD_USER', async (req, res) => {

		socket.userId = req.userId
		users[socket.userId] = socket

	})	
}

let userJoinRoom = (socket) => {

	socket.on('USER_JOIN_ROOM', (req, res) => {
		var roomId = req.roomId
		socket.join(roomId)
	})
}

let userLeaveRoom = (socket) => {

	socket.on('USER_LEAVE_ROOM', (req, res) => {
		var roomId = req.roomId

		socket.leave(roomId, () => {

		    socket.to(roomId).emit('USER_LEAVE_ROOM', {message: "User has left the room"});
		});
	})
}

let sendMessenger = (socket) => {

	socket.on('SEND_MESSENGER', (req, res) => {
		var roomId = req.roomId
		var message = req.message
		var userId = req.userId


		socket.to(roomId).emit('SEND_MESSENGER', {message: message, userId: userId})

	})
}

let sendNotify = (socket) => {
	socket.on('SEND_NOTIFY', async (req, res) => {
		var userId = req.userId
		if(users[userId]){

			var newNotify = await UserNotification.create({
				name: 'Khong co gi dauuuuuuu',
				type: 'notify',
				receiverId: 2,
				senderId: 1
			})

			users[userId].emit('SEND_NOTIFY', {message: "You have just 1 new notification", data: newNotify})
		}	
	})
}

let sendMail = (socket) => {

	socket.on('SEND_MAIL', async (req, res) => {
		setTimeout(async () => {

			var from = 'zipzizza20@gmail.com'
			var mailTo = 'quocphong.fit@gmail.com'
			var subject = 'Confirm Requirement'
			var data ={
				username: "Phong"
			}
			sendMailService.sendMailContactCustomer(from, mailTo, subject, data, (sendMailResponse) => {
				if(sendMailResponse){
					socket.emit('SEND_MAIL', {msg: "Hello"})
				}
			})

		}, 3000)
	})
}

let removeUser = (socket) => {
	socket.on('REMOVE_USER', (req, res) => {
		var userId = req.userId
		delete users[userId]

		console.log("remove success")
	})
}


let showUsersInRoom = (socket) => {
	// socket.on('REMOVE_USER', (req, res) => {
	// 	var userId = req.userId
	// 	delete users[userId]

	// 	console.log("remove success")
	// })
}

module.exports = {
	sendMail: sendMail,
	addUser: addUser,
	sendNotify: sendNotify,
	removeUser: removeUser,
	sendMessenger: sendMessenger, 
	userJoinRoom: userJoinRoom,
	userLeaveRoom: userLeaveRoom
}