<template>
	<v-col cols="12">
		<v-card>
			<v-toolbar dark color="primary darken-1">
	          <v-toolbar-title>Room 1</v-toolbar-title>

	          <v-spacer></v-spacer>

	          <v-menu 
	          offset-y
	          transition="slide-x-transition"
	          >
	          	<template v-slot:activator="{ on }">
	           		<v-btn icon v-on="on" color="primary" dark slot="activator">
	           			<v-icon>mdi-account</v-icon>
	           		</v-btn>
	           	</template>
	            <v-list>
	              <v-list-item v-for="(item, index) in menu" :key="index">
		  				<v-list-item-content>
		  					<v-list-item-title>{{item.title}}</v-list-item-title>
		  				</v-list-item-content>
		  			</v-list-item>
	            </v-list>
	          </v-menu>
	        </v-toolbar>

	        <v-card-text

	        @v-chat-scroll-top-reached="loadMoreMessenger"
	        v-chat-scroll="{always: false, smooth: true, scrollonremoved: true}" 
	        class="window-message"
	        >

	        	<v-list 
	        		v-for="(item, index) in listMessengers"
	        		:key="index"
	        		class="receive pb-0 pt-0"
	        	>	
	        		<div class="block" v-if="item.userId !== userInfo.id">
		        		<v-subheader class="header-name">{{item.username}}</v-subheader>
		        		<v-list-item v-if="item.userId !== userInfo.id">
		        			<v-list-item-avatar class="logo-img">
					            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
					        </v-list-item-avatar>
					        <v-list-item-title>
					        	<v-chip :ripple="false">{{item.message}}</v-chip>
					        </v-list-item-title>
		        	 	</v-list-item>
		        	</div>

		        	<div class="block" v-else>
		        	 	<v-list-item 
		        	 	class="justify-end"
		        	 	>
		        	 		<v-chip color="secondary" :ripple="false">{{item.message}}</v-chip>
		        	 	</v-list-item>
		        	</div>

		     <!--    		<div v-if="showStatusUserLeave(listMessengers.length, index)">
		        			<v-subheader class="justify-center">User has left this room</v-subheader>  
		        		</div> -->
	        	</v-list>


	        </v-card-text>

	        <v-card-actions >
	     		<v-col cols="12">
	     			<v-spacer></v-spacer>
	     			<v-col class="d-flex float-right" cols="6">
		     		  	<v-text-field
		     		  		v-model="message"
				            solo
				            clearable
				            label="Message"
				            hide-details="auto"
				            @click:clear="clearMessage"
				          ></v-text-field>
				          <v-btn @click.sync="send" fab dark small color="primary" class="ml-4 pa-3">
				            <v-icon dark>send</v-icon>
				         </v-btn>
				    </v-col>
	     		</v-col>
	        </v-card-actions>
		</v-card>		
	</v-col>
</template>

<style lang="scss">
.v-card-text{
	height: 400px;
}
.v-card__actions{
	width: 100%;
}

.window-message{
	overflow-y: scroll;
	height: 500px;
}

.header-name{
	margin-bottom: -15px;
	margin-top: -10px;
}

</style>

<script>
import Modal from '@/store/models/modal'


export default{


	async created(){
		var progress =  this.$Progress
    	progress.start()
			await this.retrieveData()
		progress.finish()
	},

	data(){
		return {
			page: 1,
	        itemsPerPage: 2,
	        search: '',
	        pageCounts: 1,
      		offset: 0,
      		currentPage: 1,

      		isMobile: false,
      		loadData: false,

      		message: '',
      		userInfo: this.$cookies.get('dataUser'),
      		roomId: this.$route.params.id,

      		menu: [
      			{
      				title: "Nodejs"
      			},

      			{
      				title: "PHP"
      			}
      		],

      		smooth: false,
      		statusUserLeave: false,
      		listMessengers: [
      		]
			
		}
	},


	mounted(){

       	this.sockets.listener.subscribe('SEND_MESSENGER', res => {
	    	if(res){
	    		this.listMessengers.push({
		    		userId: res.userId,
		    		message: res.message
		    	})
	    	}
	    })

    	this.sockets.listener.subscribe('USER_LEAVE_ROOM', res => {
	    	if(res){
	    		this.listMessengers.push({
		    		userId: res.userId,
		    		message: res.message
		    	})
	    	}
	    })

	},

	methods: {

		create(){
			Modal.dispatch('warehouseCreate', {option: 'show'})
		},

		edit(item){
	    	this.technicalRepair = {...item}
	    	Modal.dispatch('warehouseEdit', {option: 'show'})
	    },
	    nextPage(page){

	    },

	    async retrieveData(){


	    },

	    send(){

	    	this.listMessengers.push({
	    		userId: this.userInfo.id,
	    		message: this.message
	    	})

	    	this.$socket.emit('SEND_MESSENGER', {
	    					message: this.message,
	    					roomId: this.roomId, 
	    					userId: this.userInfo.id
	    				})
	    	this.clearMessage()

	    },

	    clearMessage () {
	        this.message = ''
	    },

	    loadMoreMessenger(){
	    	console.log("do")
	    },

	    showStatusUserLeave(mesengerLength, index){
	    	index++
	    	this.statusUserLeave = true
	    	return mesengerLength === index 
	    }
	},

	computed: {

	},

	beforeDestroy(){

		this.$socket.emit('USER_LEAVE_ROOM', {})
		// var conf = confirm('Do you want to exit?')
		// if(conf){
		// 	return false
		// }
	}

}	
</script>