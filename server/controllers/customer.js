let customerList = (req, res) => {

	const customerList = [
		{
			id: 1,
			name: 'haohao',
			email: 'zipzizza20@gmail.com',
			phoneNumber: '11111111',
			address: 'Quận 1, TP.HCM'
		},
		{
			id: 2,
			name: 'minhanh',
			email: 'zipzizza21@gmail.com',
			phoneNumber: '222222222',
			address: 'Quận 1, TP.HCM'
		},

		{
			id: 3,
			name: 'bichphuong',
			email: 'zipzizza22@gmail.com',
			phoneNumber: '3333333',
			address: 'Quận 1, TP.HCM'
		},
		{
			id: 4,
			name: 'kieuoanh',
			email: 'zipzizza23@gmail.com',
			phoneNumber: '44444444',
			address: 'Quận 1, TP.HCM'
		},
		{
			id: 5,
			name: 'phamphong',
			email: 'phamphong@gmail.com',
			phoneNumber: '0922123123',
			address: 'Quận 8, TP.HCM'
		},
		{
			id: 8,
			name: 'khongphuong',
			email: 'khongphuong@gmail.com',
			phoneNumber: '0965256272',
			address: 'Đồng Nai'
		},
		{
			id: 9,
			name: 'quocvuong',
			email: 'quocvuong@gmail.com',
			phoneNumber: '0965856272',
			address: 'Bình Thuận'
		},
	]

	return res.status(200).json(customerList)
}

let create = (req, res) => {

	console.log(req)

}

module.exports = {
	customerList: customerList,
	create: create
}