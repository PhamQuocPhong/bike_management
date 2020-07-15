export default {
	get: function(key){
		return localStorage.getItem(key) ? localStorage.getItem(key) : null
	},

	set: function(key, val){
		return localStorage.setItem(key, val)
	},

	remove: function(key){
		return localStorage.removeItem(key)
	}

}