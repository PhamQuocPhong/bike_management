export default {
	defaultString (val){
		return !val ? '' : val
	},

	defaultNumber(val){
		return !val ? 0 : parseInt(val)
	},

	colorStatusBike(value){

		switch(value){
    		case 'new':
    			return 'red'
    		break
    		case 'normal':
    			return 'green'
    		break
    		case 'old':
    			return 'orange'
    		default: 
    			return 'grey'
    		break
    	}
	},
	
	colorStatusTransaction(item){

		if(item.status === "completed"){
			return 'blue'
		}

		if(typeof item.vehicleTests !== 'undefined'){
			if(Object.keys(item.vehicleTests).length === 0 || item.vehicleTests.some((obj) => obj.bikeStatus == null || obj.bikeStatus === "waiting" )){
				item.status = "waiting"
			}else {
				item.status = "confirm"
			}
		}

		switch(item.status){
			case 'waiting':
				return 'grey'
				break
			case 'confirm':
				return 'green'
				break
			case 'cancel':
				return 'red'
				break
		}
	},

	colorStatusContact(val){
		switch(val){
			case 1:
				return 'blue'
				break
			default:
				return 'grey'
			break;
		}
	},

	colorStatusFixing(val){
		switch(val){
			case 1:
				return 'blue'
				break
			default:
				return 'grey'
			break;
		}
	},

	colorStatusVehicle(val){
		switch(val){
			case 0:
				return 'blue'
				break
			default:
				return 'grey'
			break;
		}
	},

	indexColumn(item, arrItem){
		return arrItem.indexOf(item) + 1
	},

	formatDate(date){
		if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
	},

	parseDate(date){
		if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
	},

	// 2 color (condtion === 1 ? blue : grey )
	colorStatusFinish(condition){
		return condition === 1 ? "blue" : "grey"
	},

	totalItem(arr, key){
		return arr.reduce((acc, item) => {
			return acc + item[key]
		}, 0)
	},

	showVehicleType(vehicleType){

		if(!vehicleType){
			return 
		}

		switch(vehicleType.id){
			case 1: 
				return  'mdi-moped' 
				break 
			case 2: 
				return 'mdi-car-side'
				break
		}
	}

}