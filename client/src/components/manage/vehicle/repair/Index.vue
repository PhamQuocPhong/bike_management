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
						          		<th>Vehicle name</th>
						          		<th>Image</th>
				    					<th>Start Date</th>
				    					<th>End Date</th>
				    					<th>Total fix price</th>
				    					<th>Buy price</th>
				    					<th>Aprrove price</th>
				    					<th>Fix status</th>
				    					<th>Publish </th>
				    					<th>Note</th>
				    					<th class="text-center">Action</th>
							        </tr>
							      </thead>
							      <tbody>
							        <tr v-for="item in vehicleRepairs" :key="item.id">
							        	<td>
							        		{{$helper.indexColumn(item, vehicleRepairs)}}
							        	</td>
								    	<td>{{item.vehiclePurchase.name}}</td>
								    	<td><v-img  height="50" width="100" contain :src="item.vehiclePurchase.image"></v-img></td>
								    	<td>{{item.startDate}}</td>
								    	<td>{{item.endDate}}</td>
								    	<td class="text-center">{{item.fixPrice | toCurrency}}</td>
								    	<td class="text-center">{{item.vehiclePurchase.price | toCurrency}}</td>
								    	<td class="text-center font-weight-bold">{{item.price | toCurrency}}</td>
								    	<td>
								    		<v-chip small dark :color="$helper.colorStatusFixing(item.fixFlg)">
								    			{{item.fixFlg === 1 ? "Finished" : "Fixing"}}
								    		</v-chip>
								    	<td>

								    		<v-switch
								    		 	v-if="item.fixFlg === 1 && item.price"
					                            v-model="item.pushlishFlg"
					                            @change="publishVehicleRepair(item)"
					                            :disabled="item.pushlishFlg === 1"
				                            >
				                            </v-switch>

				                            <v-switch
					                           	v-else
					                            v-model="item.pushlishFlg"
					                            @click.stop="stop(item)"
					                            :disabled="!item.price"
				                            >
				                            </v-switch>

                        				</td>
								    	<td>{{item.note}}</td>
								    	<td class="text-center">
								    		<v-btn color="white" small class="primary mr-4" @click="edit(item)">View</v-btn>
							    			<v-btn color="white" small class="warning">Cancel</v-btn>
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

	   		<vehicle-repair v-if="manageVehicleRepairEdit" :vehicleRepair.sync="vehicleRepair"></vehicle-repair> 
	</v-container>	
</template>

<script>

// component
import VehicleRepairEdit from './Edit'


// store
import VehicleType from '@/store/models/vehicle_type' 
import Vehicle from '@/store/models/vehicle'
import VehicleRepair from '@/store/models/vehicle_repair'
import Modal from '@/store/models/modal'

import HelperCommon from '@/helpers/common' 
export default{

	components: {
		'vehicle-repair': VehicleRepairEdit,
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
      		editDialog: false,
      		pageCounts: 0,
      		vehicleRepair: null,
		}
	},

	mounted(){

	},

	methods: {
	    edit(item){
	    	Modal.dispatch('manageVehicleRepairEdit', {option: 'show'})
	    	this.vehicleRepair = {...item}
	    },	

	    
	    async retrieveData(){
	    	var progress =  this.$Progress
			progress.start()
		    const res = await VehicleRepair.api().fetchPaging(this.currentPage, this.itemsPerPage)
			if(res.response.status === 200){
				VehicleRepair.insert({data: res.response.data.data})
				this.pageCounts = res.response.data.pageCounts
				progress.finish()
			}else{
				progress.fail()
			}
	    },


	    async stop(item){

	    	if(item.pushlishFlg === 1){
	    		toastr.warning('This vehicle must be fixed!', 'Warning!', {timeOut: 1000})
	    	}else if(!item.price){
	    		toastr.warning('Please approve price for vehicle!', 'Warning!', {timeOut: 1000})
	    	}
	    },

	    async publishVehicleRepair(item){

	        const vehicleRepairId = item.id
	        item.pushlishFlg = (item.pushlishFlg === true) ? 1 : 0
	        const res = await VehicleRepair.api().publish(vehicleRepairId, item)
	            if(res.response.status === 200){
	            VehicleRepair.update({
	              where: vehicleRepairId,
	              data:  res.response.data.data
	            })
	            toastr.success(res.response.data.message, 'Success!', {timeOut: 1000})
	        }
	    },

	    nextPage(){

	    },

	},

	computed: {
		vehicleRepairs(){
			var itemsPerPage = this.itemsPerPage
			var page = this.currentPage
			if(page == 1){
				this.offset = 0
			}
			else{
				this.offset = ((page - 1) * itemsPerPage) 
			}
			return VehicleRepair.query().with('vehiclePurchase').offset(this.offset).limit(itemsPerPage).get()
		},
		manageVehicleRepairEdit(){
          return Modal.getters('manageVehicleRepairEdit')
      	}
	}

}
</script>