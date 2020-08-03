const sendMailService = require('./services/email')
const UserNotification = require('./models/user_notification')
const User = require('./models/user')
const Employee = require('./models/employee')
const helper = require('./helpers/helper')

var users = {}

let addUser = (socket) => {

	socket.on('ADD_USER', async (req, res) => {

		console.log("add user sucess")

		socket.userId = req.userId
		users[socket.userId] = socket

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

module.exports = {
	sendMail: sendMail,
	addUser: addUser,
	sendNotify: sendNotify,
	removeUser: removeUser 
}