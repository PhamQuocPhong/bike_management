import Router from '../router';
import Vue from 'vue'
export default {

	create: async (url, data = null, options = {}) => {

		try {
	       const res = await axios.post(url, data, options)
			if(res){
				return res
			}		      

	    } catch (error) {
	    	return error.response
	    }
	},


	get: async (url,  options = {}) => {

		try {
	       const res = await axios.get(url, options)
			if(res){
				return res
			}		      

	    } catch (error) {
	    	return error.response
	    }
	},


}