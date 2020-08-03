<template>
<v-layout>
	<v-menu
  	transition="slide-y-transition"
  	>
  		<template v-slot:activator="{ on: activeEmail }" >
  			<v-tooltip bottom>
			  	<template v-slot:activator="{ on: tooltipEmail }">
		  			<div v-on="tooltipEmail">
			  			<v-btn tile large icon v-on="activeEmail">
				  			<v-badge
					        	bordered
						        color="error"
						        dot
						        overlap
						     >
						        <v-icon>mdi-email</v-icon>
						    </v-badge>
						</v-btn>
					</div>
				</template>
				<span>Email</span>
			</v-tooltip>
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
</v-layout>
</template>

<script>
export default {
	data(){
		return {
			menuInfo: [
				{title: 'Profile', icon: 'mdi-account-circle', link: '/user/profile'},
				{title: 'My Course', icon: 'mdi-folder-multiple', link: 'user/notify'},
				{title: 'Logout', icon: 'mdi-login-variant', link: '/auth/logout'},
			],

		}
	}
}
</script>