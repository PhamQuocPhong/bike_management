<template>
	<v-container>
			<v-row>
				<v-col md="12">
					<v-chip
				      class="ma-4"
				      color="pink"
				      label
				      text-color="white"
				    >
					    <v-icon left>mdi-label</v-icon>
					    	Customer Sell
					    </v-chip>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-flex class="pa-4">
				    	<v-card flat>
				    		<v-row no-gutters>
				    			<v-col xs="0"></v-col>
								<v-spacer></v-spacer>

				    			<v-col md="4">
				    				<v-text-field
							        v-model="search"
							        append-icon="mdi-magnify"
							        label="Search"
							        single-line
							        hide-details
							      ></v-text-field>
							    </v-col>

				    			<v-col md="2">
				    				<v-select
				    				  :items="itemsPerPageList"
				    				  label="Item per page"
				    				  v-model="itemsPerPage"
				    				  class="ml-4"
				    				></v-select>
				    			</v-col>
				    		</v-row>

				    		<v-row>
				    			<v-col md="12">
				    				<v-data-table
							      :headers="headers"
							      :items="vehicleTests"
							      :page.sync="page"
							      :items-per-page="itemsPerPage"
							      hide-default-footer
							      class="elevation-1 table"
							      @page-count="pageCount = $event"
							 
							    >	
							    	<template v-slot:item.action="{ item }">
							    		<v-btn color="white" small class="primary mr-4" @click="edit(item)" >
											<v-icon>mdi-square-edit-outline</v-icon>
										</v-btn>
							    	</template>

							    	<template v-slot:item.no="{ item }">
							    		{{$helper.indexColumn(item, vehicleTests)}}
							    	</template>

							    	<template v-slot:item.bikeCode="{ item }">
							    		{{item.bikeCode}}
							    	</template>

							    	<template v-slot:item.image="{ item }">
							    		<v-img  height="50" width="100" contain :src="item.image"></v-img>
							    	</template>


							    	<template v-slot:item.vehicleType="{ item }">
							    		{{item.vehicleType.name}}
							    	</template>

							    	<template v-slot:item.registrationPlate="{ item }">
							    		{{item.registrationPlate}}
							    	</template>

							    	<template v-slot:item.bikeStatus="{ item }">

							    		<v-chip :color="$helper.colorStatusBike(item.bikeStatus)"  class="justify-center status-bike" small dark v-if="item.bikeStatus"> 
							    			{{item.bikeStatus}} 
							    		</v-chip>

							    		<v-chip :color="$helper.colorStatusBike(item.bikeStatus)"  class="justify-center status-bike" small  dark v-else>
							    			waiting 
							    		</v-chip>

							    	</template>

							    	<template v-slot:item.rangePrice="{ item }">
							    		<div v-if="item.minPrice">
							    			{{item.minPrice}} - {{item.maxPrice}} $
							    		</div>
							    	</template>

						    	</v-data-table>
				    			</v-col>
					    		
				    		</v-row>
						    <div class="text-center pt-2">
						      <v-pagination v-model="page" :length="pageCount"></v-pagination>
						    </div>		  
						    <vehicle-test v-if="dialogVehicleTest" :role="role"  :dialogVehicleTest.sync="dialogVehicleTest" :vehicleTest.sync="vehicleTest"></vehicle-test>
				    	</v-card> 	 
	   				</v-flex>
				</v-col>
	   		</v-row> 
	</v-container>	
</template>

<script>
import VehicleTestComponent from './VehicleTest.vue'
import TechnicalTest from '@/store/models/technical_test'
import VehicleType from '@/store/models/vehicle_type' 
import VehicleTest from '@/store/models/vehicle_test'

import HelperCommon from '@/helpers/common' 
export default{

	components: {
		'vehicle-test': VehicleTestComponent
	},

	async created(){

		var progress =  this.$Progress
		progress.start()
		const res = await TechnicalTest.api().fetchAll()

		if(res.response.status === 200){
			TechnicalTest.insert({data: res.response.data.data})
			progress.finish()
		}else{
			progress.fail()
		}
	},

	data(){
		return {
			page: 1,
	        pageCount: 0,
	        itemsPerPage: 10,
	        search: '',
	        itemsPerPageList: [5, 10, 15],
	        headers: [
	        	{ text: 'No.', value: 'no' },
	        	{ text: 'Bike code', value: 'bikeCode' },
	        	{ text: 'Image', align: 'center', value: 'image'},
	        	{ text: 'Vehicle type', value: 'vehicleType' },
	          	{ text: 'Registration plate', value: 'registrationPlate' },
	          	{ text: 'Bike status', value: 'bikeStatus' },
	          	{ text: 'Range Price', value: 'rangePrice' },
	          	{ text: 'Action', align: 'center', value: 'action', width: 200 },
	        ],
      		dialogVehicleTest: false,
      		vehicleTest: '',
      		role: 'technical'
		}
	},

	mounted(){

	},

	methods: {
	    edit(item){
	    	this.vehicleTest = {...item}
	    	this.dialogVehicleTest = true
	    },


	},

	computed: {
		vehicleTests(){
			return VehicleTest.query().with('technicalTest').with('vehicleType').get()
		},

		employeeInfo(){
			return this.$cookies.get('dataUser').employee
		}

	}

}
</script>