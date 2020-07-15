const VehicleType = require('../models/vehicle_type')


let getAll = async(req, res) => {
	try {
		const vehicleTypes = await VehicleType.findAll()
		return res.status(200).json({message: 'Retrieve success', data: vehicleTypes})
	} catch(error) {
		return res.status(500).json(error)
	}
}


module.exports = {
	getAll: getAll
}