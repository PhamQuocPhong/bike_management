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
					    	Vehicle Warehouse
					    </v-chip>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
									<v-flex class="pa-4">
			    	<v-card flat>
			    		<v-row no-gutters>
			    	<!-- 		<v-col cols="2">
			    				<v-btn color="white" class="primary mr-4" small  @click="create">Create</v-btn>
			    			</v-col>
 -->
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
				    					<th>Type</th>
				    					<th>Price</th>
				    					<th>Status</th>
				    					<th class="text-center">Action</th>
							        </tr>
							      </thead>
							      <tbody>
							        <tr v-for="item in vehicles" :key="item.id">
							        	<td>
							        		{{$helper.indexColumn(item, vehicles)}}
							        	</td>
								    	<td>{{item.name}}</td>
								    	<td>{{item.color}}</td>
								    	<td>
								    		<v-img  height="50" width="100" contain :src="item.image"></v-img>
								    	</td>
								    	<td>{{item.vehicleType.name}}</td>
								    	<td>{{item.price}}</td>
								    	<td>
								    		<v-chip small :color="$helper.colorStatusVehicle(item.valid)" dark >
								    			{{item.valid === 0 ? "Sold" : "Waiting"}}	
								    		</v-chip>
								    	</td>

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

	   	<create v-if="warehouseCreate" ></create>
<!-- 	   	<edit v-if="editDialog" :editDialog.sync="editDialog"></edit> -->

	</v-container>	
</template>

<script>

import Vehicle from '@/store/models/vehicle'
import VehicleType from '@/store/models/vehicle_type'
import Modal from '@/store/models/modal'

import CreateComponent from './Create.vue'
import EditComponent from './Edit.vue'
export default{

	components: {
		'create': CreateComponent,
		'edit': EditComponent
	},

	async created(){
		this.retrieveData()
	},

	data(){
		return {
			page: 1,
	        pageCount: 0,
	        itemsPerPage: 10,
	        search: '',
	        itemsPerPageList: [5, 10, 15],
	        pageCounts: 1,
      		offset: 0,
      		currentPage: 1,
      		editDialog: false,
      		createDialog: false
		}
	},

	mounted(){
	
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
	    	this.currentPage = page
	    	this.retrieveData()
	    },
	    async retrieveData(){
	    	var progress =  this.$Progress
			progress.start()
		    const res = await Vehicle.api().fetchPaging(this.currentPage, this.itemsPerPage)

			if(res.response.status === 200){
				Vehicle.insert({data: res.response.data.data})
				this.pageCounts = res.response.data.pageCounts
				progress.finish()
			}else{
				progress.fail()
			}
	    }
	},

	computed: {
		vehicles(){

			var itemsPerPage = this.itemsPerPage
			var page = this.currentPage
			if(page == 1){
				this.offset = 0
			}
			else{
				this.offset = ((page - 1) * itemsPerPage) 
			}
			return Vehicle.query().with('vehicleType').offset(this.offset).limit(itemsPerPage).get()
		},

		warehouseCreate(){
        	return Modal.getters('orderBuyEdit')
      	}

	    warehouseEdit(){
	        return Modal.getters('warehouseEdit')
	    }

	}

}
</script>