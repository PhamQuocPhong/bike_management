<template>
    <v-app>
    	<progress-bar></progress-bar>
    	<!-- <vue-progress-bar></vue-progress-bar> -->
    	<router-view></router-view>
  	</v-app>
</template>



<style lang="scss">
@import '@/styles/index'

</style>


<script>
import ProgressBar from './components/custom/HeaderProgress.vue'
export default {

	components: {
		'progress-bar': ProgressBar
	},

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
