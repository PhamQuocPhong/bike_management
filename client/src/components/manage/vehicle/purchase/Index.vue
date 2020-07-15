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

				    		<v-simple-table class="table">
							    <template v-slot:default>
							      <thead>
						        	<tr>
						          		<th>No.</th>
						          		<th>Name</th>
						          		<th>Color</th>
						          		<th>Image</th>
				    					<th>Code</th>
				    					<th>Registration plate</th>
				    					<th>Status</th>
				    					<th>Price</th>
				    					<th class="text-center" style="width: 200px;">Action</th>
							        </tr>
							      </thead>
							      <tbody>
							        <tr v-for="item in vehiclePurchases" :key="item.id">
							        	<td>
							        		{{$helper.indexColumn(item, vehiclePurchases)}}
							        	</td>
								    	<td>{{item.name}}</td>
								    	<td>{{item.color}}</td>
								    	<td><v-img  height="50" width="100" contain :src="item.image"></v-img></td>
								    	<td>{{item.code}}</td>
								    	<td>{{item.registrationPlate}}</td>
								    	<td>
									    	<v-chip :color="$helper.colorStatusBike(item.status)"  class="justify-center status-bike" small dark> 
								    			{{item.status}} 
								    		</v-chip>
								    	</td>
								    	<td>{{item.price | toCurrency}}</td>
								    	<td class="text-center">
								    		<v-btn color="white" small class="primary mr-4" @click="edit(item)" >
								    			<v-icon>mdi-square-edit-outline</v-icon>
								    		</v-btn>
							    			<v-btn color="white" small class="warning">
							    				<v-icon>mdi-delete-outline</v-icon>
							    			</v-btn>
								    	</td>
							        </tr>
							      </tbody>
							    </template>
						  	</v-simple-table>

						  	<v-row justify="center">
						        <v-col cols="8">
						          <v-container class="max-width">
						            <v-pagination
						              v-model="currentPage"
						              class="my-4"
						              :length="pageCounts"
						              @input="nextPage"
						            ></v-pagination>
						          </v-container>
						        </v-col>
						    </v-row>	  

				    	</v-card> 	 
	   				</v-flex>
				</v-col>
	   		</v-row>

	   		<vehicle-purchase v-if="dialogEdit" :dialogEdit.sync="dialogEdit" :vehiclePurchase.sync="vehiclePurchase"></vehicle-purchase> 
	</v-container>	
</template>



<script>

// component
import VehilcePurChaseEdit from './Edit'


// store
import VehicleType from '@/store/models/vehicle_type' 
import Vehicle from '@/store/models/vehicle'
import VehiclePurchase from '@/store/models/vehicle_purchase'
import VehicleRepair from '@/store/models/vehicle_repair'
import ReceptionCustomerSell from '@/store/models/reception_customer_sell'


import HelperCommon from '@/helpers/common' 
export default{

	components: {
		'vehicle-purchase': VehilcePurChaseEdit,
	},

	async created(){

		this.retrieveData()

		var vehicalTypes = VehicleType.all()
		if(vehicalTypes.length <= 0){
			VehicleType.insert({
				data: [
					{
						id: 1,
						name: 'Motor bike'
					},
					{
						id: 2,
						name: 'Cycle bike'
					},
				]
			})
		}
	},

	data(){
		return {
			page: 1,
	        pageCount: 0,
	        itemsPerPage: 10,
	        search: '',
	        itemsPerPageList: [5, 10, 15],
      		dialogVehicleTest: false,
      		vehicleTest: '',
      		role: 'technical',
      		currentPage: 1,
      		dialogEdit: false,
      		vehiclePurchase: null,
      		pageCounts: 0,
		}
	},

	mounted(){

	},

	methods: {
	    edit(item){
	    	this.dialogEdit = true
	    	this.vehiclePurchase = {...item}
	    },	


	    async retrieveData(){
	    	var progress =  this.$Progress
			progress.start()
		    const res = await VehiclePurchase.api().fetchPaging(this.currentPage, this.itemsPerPage)
			if(res.response.status === 200){
				VehiclePurchase.insert({data: res.response.data.data})
				this.pageCounts = res.response.data.pageCounts
				progress.finish()
			}else{
				progress.fail()
			}
	    },

	    nextPage(){

	    },

	    colorStatusBike:  HelperCommon.colorStatusBike

	},

	computed: {
		vehiclePurchases(){
			return VehiclePurchase.query().with('receptionCustomerSell', (query) => {
				query.with('employee').with('customer')
			}).with('vehicleRepair').get()
		},

	}

}
</script>
