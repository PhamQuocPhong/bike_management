<template>
    <v-app>
    	<vue-progress-bar></vue-progress-bar>
    	<router-view></router-view>
  	</v-app>
</template>



<style lang="scss">
@import '@/styles/index'

</style>


<script>
export default {
	data(){
		return {
			userInfo: this.$cookies.get('dataUser')
		}
	},

	mounted(){

		if(this.userInfo){

			this.$socket.emit('ADD_USER', {
            	userId: this.userInfo.id
          	})


            this.sockets.listener.subscribe('SEND_NOTIFY', data => {
 				
 				if(data){
 					toastr.success(data.message, '', {timeOut: 1000})
 				}		

           		// this.sockets.listener.unsubscribe('SEND_NOTIFY');
            })
		}

	}
}
</script>
