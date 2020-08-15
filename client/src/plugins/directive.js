import Vue from 'vue'

Vue.directive('can', {
	inserted(el, binding) {
		var currentUser = $cookies.get('dataUser')
		if(currentUser.roleId === 3 && currentUser.roleId === binding.value ){
			el.parentNode.removeChild(el)
		}
  	}
})

Vue.directive('check-position', {
	inserted(el, binding) {
		var currentUser = $cookies.get('dataUser')
		var employeeInfo = currentUser.employee

		if(!binding.value){
			return
		}

		if(employeeInfo.positionId === 1){
			return
		}
		
		if(employeeInfo.positionId !== binding.value ){
			el.parentNode.removeChild(el)
		}
  	}
})


export default {

}