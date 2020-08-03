const path = require( "path" )
require('dotenv').config({path: path.resolve('../.env')})

const aws  = require('aws-sdk')
const fs = require('fs')

const bucket = process.env.BUCKET
const region = process.env.REGION
const accessKey = process.env.AWS_ACCESS_KEY 
const secretAccessKey = process.env.AWS_SECRET_KEY 


aws.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretAccessKey,
  // region: region
})

console.log(path.join('/server'))


let uploadImageBase64 = async (image, callback) => {

	if(!image || image === ''){
		return ''
	}

	var buff = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""),'base64')
	const imageRemoteName = `bike_${new Date().getTime()}.jpg`
	var s3 = new aws.S3()
		
	const res = await s3.putObject({
		Bucket: bucket,
		Body: buff,
		Key: imageRemoteName,
		ACL: "public-read"
	})
	.promise()
	.then(async res => {

	  	const url = await s3.getSignedUrl('getObject', { Bucket: bucket, Key: imageRemoteName })

	  	if(typeof callback === 'function'){
	  		callback(url)
	  	}
	})
	.catch(err => {
		console.log("Upload failed:", err)
	})
}

let getCallbackURL = (url) => {
	return url.split("?")[0]
}

module.exports = {
	uploadImageBase64: uploadImageBase64,
	getCallbackURL: getCallbackURL
}


