<template>
	<v-navigation-drawer 
	v-model="initDrawer"
	:mini-variant="initMini" 
	src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" 
	width="260"
	app 
	dark
	>
	    <v-list-item class="logo"  :to="'/'">
	        <v-list-item-avatar class="logo-img">
	            <v-img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png"></v-img>
	        </v-list-item-avatar>
	        <v-list-item-title>PVH Store</v-list-item-title>
	    </v-list-item>
	    <v-divider></v-divider>
	    <v-list dense nav class="py-0 transparent">

	        <v-list-item link @click="itemList($event)" to="/dashboard">
		      	<v-list-item-icon>
		      		<v-icon>mdi-home</v-icon>
		      	</v-list-item-icon>

		      	<v-list-item-content>
		      		<v-list-item-title>Dashboard</v-list-item-title>
		      	</v-list-item-content>
	      	</v-list-item>

		
		     <v-list-group dense
		        v-for="item in groupMenus"
		        :key="item.title"
		        :prepend-icon="item.action"
		        v-model="item.active"
		        v-check-position="item.position"
		      >
		        <template v-slot:activator>
		          <v-list-item-content>
		            <v-list-item-title v-text="item.title"></v-list-item-title>
		          </v-list-item-content>
		        </template>

		        <v-list-item
		          v-for="subItem in item.items"
		          :key="subItem.title"
		          :to="subItem.link"
		         
		        >
		       		<v-list-item-icon>
		      			<v-icon v-text="subItem.icon"></v-icon>
		      		</v-list-item-icon>
		          	<v-list-item-content>
		            	<v-list-item-title v-text="subItem.title"></v-list-item-title>
		         	 </v-list-item-content>
		        </v-list-item>
		     </v-list-group>

		       <v-list-item 
		       v-for="(item, index) in listMenu" 
		       :to="item.link" 
		       @click="itemList($event)"
		       :key="item.title"
		       v-check-position="item.position"
		       >
		      	<v-list-item-icon>
		      		<v-icon>{{item.icon}}</v-icon>
		      	</v-list-item-icon>

		      	<v-list-item-content>
		      		<v-list-item-title>{{item.title}}</v-list-item-title>
		      	</v-list-item-content>
		    </v-list-item>
	    </v-list>

	   
	</v-navigation-drawer>
</template>
<style type="text/css">

</style>
<script>
export default {
	props: {
		mini: Boolean,
		drawer: Boolean,
	},

	data(){
		return {
		    initMini: this.mini,
		    initDrawer: this.drawer,
		    groupMenus: [

		    	{ 
	        		title: 'Recept Customer', 
	        		link: '/reception', 
	        		action: 'mdi-account-box-multiple', 
	        		active: false,
	        		position: 3,
	        		items: [
	        			{ title: 'Customer Sell', link: '/reception/customer-sell', icon: 'mdi-cash-minus', },
	        			{ title: 'Customer Buy', link: '/reception/customer-buy', icon: 'mdi-cash-plus',  },
	        		]
	        	},

	        	{
		            action: 'mdi-tools',
		            title: 'Technical',
		            active: false,
		            position: 2,
		            items: [
		            	{ title: 'Repair', link: '/technical/repair', icon: 'mdi-wrench',  },
		            	{ title: 'Test', link: '/technical/test', icon: 'mdi-clipboard-check',  },
	            	],
	        	},


	        	{ 
	        		title: 'Management', 
	        		link: '/manage', 
	        		action: 'mdi-view-dashboard', 
	        		active: false,
	        		items: [
	        			{ title: 'Vehicle Purchase ', link: '/manage/vehicle-purchase', icon: 'mdi-moped',   },
	        			{ title: 'Vehicle Repair', link: '/manage/vehicle-repair', icon: 'mdi-moped',   },
	        		]
	        	},
	        ],

	        listMenu: [
	        	{ title: 'Sales', link: '/sales', icon: 'mdi-point-of-sale', permission: null, position: 4 },
	        	{ title: 'Warehouse', link: '/warehouse', icon: 'mdi-recycle', permission: null  },
	        	{ title: 'Orders', link: '/orders', icon: 'mdi-billboard', permission: null  },
	        ],
	        check: "admin"	
		}
	},

	created(){
	
	},
	watch: {
		mini: function(){
			this.initMini = this.mini
		},
		drawer: function(value){

			if(this.initDrawer == value)
			{
				value = true
			}
			this.initDrawer = value
		}
	},

	methods: {
		itemList(event){
			this.groupMenus.filter(groupMenu => {
				groupMenu.active = false
			})
		}
	}

	// computed: {
	// 	counter: {
	// 		get: function(){
	// 			return this.mini
	// 		},
	// 		set: function(newValue){
	// 			this.mini = newValue
	// 		}
	// 	}
	// }

  }
</script>