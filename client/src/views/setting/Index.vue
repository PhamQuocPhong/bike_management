<template>
	<v-container>
		<v-row>
			<label-table
			title="Sales"
			>
			</label-table>
		</v-row>

		<v-row>
			<v-flex :class="{'pa-4': !isMobile}">
				<v-card>
					<v-switch    
					hide-details
			        inset
			        label="Theme Dark" 
			        v-model="$vuetify.theme.dark">
						
					</v-switch> 
				</v-card>
			</v-flex>
		</v-row>
	</v-container>
</template>

<script>
export default{

	data(){
		return {
			isMobile: false
		}
	},

	methods: {

	}
}
</script>