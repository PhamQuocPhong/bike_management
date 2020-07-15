let defaultValue = (input, option) => {

	switch (option) {
		case 'number':
			if(!input || isNaN(input)){
				return 0
			}
			return input
			break;
		case 'string':
			// statements_1
			break;
		case 'array':
			// statements_1
			break;
		case 'array':
			// statements_1
		break;

		default:
			// statements_def
			break;
	}		
}

let formatCurrency = (value) => {
	if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
}

let convertDate = (value) => {
	var date = new Date(value),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  	return [day, mnth, date.getFullYear()].join("/");
}

let calcTotal = (arr, key) => {
	var totalPrice = arr.reduce((acc, obj) => {
		return acc + obj[key]
	}, 0)

	return formatCurrency(totalPrice)
} 

let calcTotalInterest = (arr, key) => {

	var totalInterestPrice = 0
	if(arr.length > 0){
		arr.forEach(transaction => { 
			var interestPrice =	transaction.transactionDetailSells.reduce((acc, obj) => {
				return acc + eval( obj.totalPrice - obj.vehicle.fixPrice - obj.vehicle.buyPrice )
			}, 0)
			totalInterestPrice += interestPrice
		})

	}
	return formatCurrency(totalInterestPrice)
}


module.exports = {
	defaultValue: defaultValue,
	formatCurrency: formatCurrency,
	convertDate: convertDate,
	calcTotal: calcTotal,
	calcTotalInterest: calcTotalInterest
}