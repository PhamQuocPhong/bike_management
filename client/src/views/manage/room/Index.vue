<template>
	<v-container>
		<v-row>
			<label-table
			title="Warehouse"
			>
			</label-table>
		</v-row>
		<v-row>
			<v-flex :class="{'pa-4': !isMobile}">
		    	<v-card flat>
			    	<v-row no-gutters>

			    		<v-btn class="mr-4" small color="primary" @click="create()">Create</v-btn>

						<v-spacer></v-spacer>
		    			<v-col md="4" sm="6" cols="12">
		    				<v-text-field
					        v-model="search"
					        append-icon="mdi-magnify"
					        label="Search"
					        single-line
					        hide-details
					      ></v-text-field>
					    </v-col>

		    			<v-col md="2" sm="6" cols="12" v-if="!isMobile">
		    				<v-select
		    				  :items="itemsPerPageList"
		    				  label="Item per page"
		    				  v-model="itemsPerPage"
		    				  @change="changePerPage()"
		    				  class="ml-4"
		    				></v-select>
		    			</v-col>
		    		</v-row>

		    		<v-layout
	    			v-resize="onResize" 
	    			column class="table" 
	    			:class="{'mt-4': isMobile}"
	    			>
				    	<v-simple-table :class="{mobile: isMobile}">
				   			<template v-slot:default v-if="!isMobile">
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

						      		<tr v-if="!loadData">
								      	<td colspan="100%">
								      		 <v-skeleton-loader
									        ref="skeleton"
									        :type="type"
									        class="mx-auto"
									      ></v-skeleton-loader>
								      	</td>
								    </tr>

							        <tr v-for="item in vehicles" :key="item.id" v-else>
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

						    <template v-slot:default v-else>
						    	<tr v-for="item, index in vehicles" :key="item.id">
						        	<td>
						        		<ul class="flex-content">
						        			<li class="flex-item" data-label="No."> 
							        			{{$helper.indexColumn(item, vehicles)}}
								        	</li>
									    	<li class="flex-item" data-label="Name"> {{item.name}}</li>
									    	<li class="flex-item" data-label="Color"> {{item.color}}</li>
									    	<li class="flex-item" data-label="Image"> 
									    		<v-img  height="50" width="100" contain :src="item.image"></v-img>
									    	</li>
									    	<li class="flex-item" data-label="Vehicle type"> {{item.vehicleType.name}}</li>
									    	<li class="flex-item" data-label="Price"> {{item.price}}</li>
									    	<li class="flex-item" data-label="Status"> 
									    		<v-chip small :color="$helper.colorStatusVehicle(item.valid)" dark >
									    			{{item.valid === 0 ? "Sold" : "Waiting"}}	
									    		</v-chip>
									    	</li>

									    	<li class="flex-item" data-label="Action">
									    		<v-btn color="white" small class="primary mr-4" @click="edit(item)" >
													<v-icon>mdi-square-edit-outline</v-icon>
												</v-btn>
								    			<v-btn color="white" small class="warning">
								    				<v-icon>mdi-delete-outline</v-icon>
								    			</v-btn>
									    	</li>
						        		</ul>
						        	</td>
							    </tr>
				    </template>
						</v-simple-table>
					</v-layout>

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
   		</v-row> 

	   	<create v-if="warehouseCreate" ></create>
	   	<edit v-if="warehouseEdit" ></edit>

	</v-container>	
</template>


<script>

import Room from '@/store/models/room'

import Modal from '@/store/models/modal'

import CreateComponent from './Create.vue'
import EditComponent from './Edit.vue'

export default{

	components: {
		'create': CreateComponent,
		'edit': EditComponent
	},

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
	        itemsPerPageList: [5, 10, 15],
	        pageCounts: 1,
      		offset: 0,
      		currentPage: 1,
      		editDialog: false,
      		createDialog: false,

      		isMobile: false,
      		loadData: false,
      		type: 'table-tbody'

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
	    	this.loadData = false
	    	this.retrieveData()
	    },
	    async retrieveData(){

	    	this.loadData = false
	    	setTimeout(async () => {
	    		const res = await Vehicle.api().fetchPaging(this.currentPage, this.itemsPerPage)
				if(res.response.status === 200){
					Vehicle.insert({data: res.response.data.data})
					this.loadData = true
					this.pageCounts = res.response.data.pageCounts
			
				}
	    	}, 500)  
	    },

	    changePerPage(){
	    	this.retrieveData()
	    },

	    onResize(){
	    	if (window.innerWidth < 769)
           		this.isMobile = true;
          	else
            	this.isMobile = false;
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
        	return Modal.getters('warehouseCreate')
      	},

	    warehouseEdit(){
	        return Modal.getters('warehouseEdit')
	    }
	},

	destroyed() {
		Vehicle.deleteAll()
	}

}
</script>