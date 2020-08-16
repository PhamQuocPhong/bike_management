const jwtHelper = require("../helpers/jwt.helper")
const User = require('../models/user')
const Employee = require('../models/employee')
const Role = require('../models/role')
const bcrypt = require('bcrypt')
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h"
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-quocphong@gmail.com"
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "365d"
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-quocphong@gmail.com"
const sendMailService = require("../services/email")
const randomString = require('randomstring')
const config = require('../config')


let tokenList = {}
/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let login = async (req, res) => {

	const { email, password } = req.body

	try {
    const findUser = await User.findOne({
      attributes: ['id','email', 'password', 'roleId'],
      where: {
        email: email
      },
      include: [
        {
          model: Employee,
        },
        {
          model: Role,
        }
      ]
    })

    if(findUser && bcrypt.compareSync(password, findUser.password)){
      delete findUser.dataValues.password
      const accessToken = await jwtHelper.generateToken(findUser.id, accessTokenSecret, accessTokenLife)
      const refreshToken = await jwtHelper.generateToken(findUser.id, refreshTokenSecret, refreshTokenLife)
      tokenList[refreshToken] = {accessToken, refreshToken}

      return res.status(200).json({accessToken, refreshToken, findUser})
    }else{
      return res.status(401).json({message: "Email or Password is not exactly!" })
    }

	}catch (error) {
    console.log(error)
	    return res.status(500).json(error)
	}
}

/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */

let register = async (req, res) => {


  try {

    const {password, email, fullName, phoneNumber} = req.body
   
    var findUser = await User.findOne({
      where: {email: email}
    })

    var verifyCode = randomString.generate()

    if(findUser){
      return res.status(401).json({message: 'This email is existed!'})
    }

    var newUser = await User.create({
      email: email,
      password: bcrypt.hashSync(password, 10),
      rememberToken: verifyCode,
      RoleId: config.userRole.EMPLYOEE
    })

    if(newUser){

     await Employee.create({
        userId: newUser.id,
        fullName: fullName,
        phoneNumber: phoneNumber
      })

      // var subject = 'Verify Account Registration'
      // sendMailService.sendMailRegister('Hao Hao', email, subject, verifyCode)
      return res.status(200).json({success: 'Create success!'})
    }
    
  } catch(error) {
     return res.status(500).json(error)
  }

}

/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {

  const refreshTokenFromClient = req.body.refreshToken
  
  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
    try {

      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret)

      const accessToken = await jwtHelper.generateToken(decoded.userId, accessTokenSecret, accessTokenLife)

      return res.status(200).json({accessToken})
    } catch (error) {

      res.status(403).json({
        message: 'Invalid refresh token.',
      })
    }
  } else {
    return res.status(403).send({
      message: 'No token provided.',
    })
  }
}

let loginSocial = async (req, res) => {

  var userData = req.body

  try{
    var findUser = await User.findOne({
      where: {
        providerId: userData.providerId
      }
    })

    // if exist user => return 
    if(findUser){
      return res.status(200).json({message: "Login success"})
    }else{
      userData.RoleId = config.userRole.GUEST
      var newUser = await User.create(userData)
      if(newUser){

        Employee.create({
          fullName: userData.fullName,
          UserId: newUser.id
        })

        return res.status(200).json({message: "Login success"})
      }
    }

  }catch(error){
    return res.status(500).json(error)
  }
}




module.exports = {
  login: login,
  refreshToken: refreshToken,
  register: register,
  loginSocial: loginSocial
}