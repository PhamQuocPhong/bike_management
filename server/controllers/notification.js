const path = require( "path" )
require('dotenv').config({path: path.resolve('../.env')})

const webPush = require('web-push')
const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey)

let pushNotify = (req, res) => {

	var description = req.body

	console.log(description)

} 


module.exports = {
	pushNotify: pushNotify
}