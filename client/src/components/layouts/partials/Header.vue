<template>
	<nav id="header-top">
		<v-app-bar		
		src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" 
		app
		dark
		>
			<div v-if="!isMobile()">
			 	<v-app-bar-nav-icon @click.stop="mini = !mini" ></v-app-bar-nav-icon>
			</div>
			<div v-else>
				<v-app-bar-nav-icon @click.stop="drawer = !drawer" ></v-app-bar-nav-icon>
			</div>
		  	<v-spacer></v-spacer>

		  	<v-col md="4"  class="d-none d-sm-flex">
			  	<v-autocomplete
			  	:loading="loading"
			    :search-input.sync="search"
			    cache-items
			    class="mx-3"
			    flat
			    hide-no-data
			    hide-details
			    solo-inverted
			    label="What state are you from?"
			    append-icon="fa fa-search"
			    color="blue-grey"
			    height="25"
			    ></v-autocomplete>
			</v-col>

			<v-menu
		  	transition="slide-y-transition"
		  	>
		  		<template v-slot:activator="{ on }" >
		  			<v-btn color="success"  dark v-on="on">
		  				<span v-if="userInfo"> 
		  					{{userInfo.employee.fullName}} 
		  				</span>
				  		<v-icon right>mdi-chevron-down</v-icon>
		  			</v-btn>
		  		</template>
		  		<v-list >
		  			<v-list-item v-for="(item, index) in menuInfo" :to="item.link" :key="index">
		  				<v-list-item-icon>
		  					<v-icon>{{item.icon}}</v-icon>
		  				</v-list-item-icon>
		  				<v-list-item-content>
		  					<v-list-item-title>{{item.title}}</v-list-item-title>
		  				</v-list-item-content>
		  			</v-list-item>
		  		</v-list>
		  	</v-menu>

		</v-app-bar>
		<navigation v-bind:mini="mini" v-bind:drawer="drawer"></navigation>
	</nav>
</template>

<style type="text/css">

</style>

<script>
import NavigationDrawer from './Sidebar'
export default {
	components: {'navigation': NavigationDrawer},

	data (){
		return {
			loading: false,
			mini: false,
			drawer: false,
			show: true,
			search: '',
			menuInfo: [
				{title: 'Profile', icon: 'mdi-account-circle', link: '/profile'},
				{title: 'My Course', icon: 'mdi-folder-multiple', link: '/my-course'},
				{title: 'Logout', icon: 'mdi-login-variant', link: '/auth/logout'},
			],
			userInfo: this.$cookies.get('dataUser')
		}
	},

	mounted(){
		setTimeout(() => {
		    this.show = false;
		  }, 5000); // toggle after 5 seconds

	},

	methods: {
		isMobile() {
            if( screen.width <= 768 ) {
                return true
            }
            else {
            	this.drawer = true
                return false
            }
        }
    },
   	
   	computed: {

   	}

}
</script>