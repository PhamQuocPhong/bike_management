<template>
	<v-container>
		<v-chip
	      class="ma-4"
	      color="pink"
	      label
	      text-color="white"
	    >
	      <v-icon left>mdi-label</v-icon>
	      Technical Repair
	    </v-chip>

		<v-row>
			<v-col cols="12">
			    <v-card flat v-if="pageCounts > 0">
		    		<v-row no-gutters >
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
		    					<th>Accessory</th>
		    					<th>Start date</th>
		    					<th>End date</th>
		    					<th>Price</th>
		    					<th>Fisnish </th>
		    					<th class="text-center">Action</th>
					        </tr>
					      </thead>
					      <tbody>
					        <tr v-for="item in technicalRepairs" :key="item.id">
					        	<td>
					        		{{$helper.indexColumn(item, technicalRepairs)}}
					        	</td>
						    	<td>{{item.accessory}}</td>
						    	<td>{{$helper.formatDate(item.startDate)}}</td>
						    	<td>{{$helper.formatDate(item.endDate)}}</td>
						    	<td>{{item.price}}</td>
						    	<td>
						    		<v-chip small dark :color="$helper.colorStatusFinish(item.finishFlg)">
						    			{{item.finishFlg === 1 ? "Finished" : "Fixing"}}
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

		    	<v-card flat v-else>
		    		<v-card-title primary-title>
		    			Don't have data
		    		</v-card-title>
		    	</v-card> 	 
			</v-col>
   		</v-row> 
   		<technical-repair-edit v-if="editDialog" :editDialog.sync="editDialog" :technicalRepair.sync="technicalRepair"></technical-repair-edit>
	</v-container>	
</template>

<script>

//component

import TechnicalRepairEdit from './Edit'

// store	
import TechnicalRepair from '@/store/models/technical_repair'

// helpers
import HelperCommon from '@/helpers/common' 

export default{

	components: {
		'technical-repair-edit': TechnicalRepairEdit
	},

	async created(){
		this.retrieveData()
	},

	data(){
		return {
			currentPage: 1,
	        itemsPerPage: 5,
	        search: '',
	        itemsPerPageList: [5, 10, 15],
      		pageCounts: 0,
      		offset: 0,
      		editDialog: false,
      		technicalRepair: null
		}
	},

	mounted(){
	
	},

	methods: {

	    edit(item){
	    	this.technicalRepair = {...item}
	    	this.editDialog = true
	    },
	    nextPage(page){
	    	this.currentPage = page
	    	this.retrieveData()
	    },
	    async retrieveData(){
	    	var progress =  this.$Progress
			progress.start()
		    const res = await TechnicalRepair.api().fetchPaging(this.currentPage, this.itemsPerPage)
			if(res.response.status === 200){
				TechnicalRepair.insert({data: res.response.data.data})
				this.pageCounts = res.response.data.pageCounts
				progress.finish()
			}else{
				progress.fail()
			}
	    }
	},

	computed: {
		technicalRepairs(){
			var itemsPerPage = this.itemsPerPage
			var page = this.currentPage
			if(page == 1){
				this.offset = 0
			}
			else{
				this.offset = ((page - 1) * itemsPerPage) 
			}

	
			if(this.pageCounts > 0){
				return TechnicalRepair.query()
									.with('vehicleRepair')
									.offset(this.offset)
									.limit(itemsPerPage)
									.get()
			}
		},

		employeeInfo(){
			return this.$cookies.get('dataUser').employee
		}

	}

}
</script>