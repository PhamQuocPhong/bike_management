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
					    	Customer Buy
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
				    					<th>Customer name</th>
				    					<th>Customer phone</th>
				    					<th>Require</th>
				    					<th>Contact</th>
				    					<th>Progess</th>
				    					<th class="text-center">Action</th>
							        </tr>
							      </thead>
							      <tbody>
							        <tr v-for="item in Sales" :key="item.id">
							        	<td>
							        		{{$helper.indexColumn(item, Sales)}}
							        	</td>
								    	<td>{{item.salesCustomerBuy.customer.name}}</td>
								    	<td>{{item.salesCustomerBuy.customer.phoneNumber}}</td>
								    	<td>{{item.salesCustomerBuy.customerRequire}}</td>
								    	<td>
								    		<v-switch
					                            v-model="item.salesCustomerBuy.contactFlg "
					                            @change="contactCustomer(item)"
					                            :disabled="item.salesCustomerBuy.contactFlg === 1"
				                            >
				                            </v-switch>

								    	</td>
								    	<td>
								    		<v-chip small :color="$helper.colorStatusTransaction(item.salesCustomerBuy)" dark >
								    			{{item.salesCustomerBuy.status}}	
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
	   		<edit  v-if="salesEdit"  :sales.sync="sales"></edit>
	</v-container>	
</template>

<script>

import SalesEditComponent from './Edit.vue'

import Sales from '@/store/models/sales'
import SalesCustomerBuy from '@/store/models/sales_customer_buy'
import Transaction from '@/store/models/reception_customer_buy'
import Modal from '@/store/models/modal'

export default{

	components: {
		'edit': SalesEditComponent
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
      		sales: '',
      		pageCounts: 1,
      		offset: 0,
		}
	},

	mounted(){
		
	},

	methods: {
	    edit(item){
	    			
	    	this.sales = {...item}
	    	Modal.dispatch('salesEdit', {option: 'show'})
	    },
	    nextPage(page){
	    	this.currentPage = page
	    	this.retrieveData()
	    },
	    async retrieveData(){
	    	var progress =  this.$Progress
			progress.start()
		    const res = await Sales.api().fetchPaging(this.currentPage, this.itemsPerPage)
			if(res.response.status === 200){
				Sales.insert({data: res.response.data.data})
				this.pageCounts = res.response.data.pageCounts
				progress.finish()
			}else{
				progress.fail()
			}
	    },

	    async stop(){
	    	toastr.warning('This vehicle must be fixed!', 'Warning!', {timeOut: 1000})
	    },

	    async contactCustomer(data){
			var contactFlg = data.salesCustomerBuy.contactFlg === true ? 1 : 0

	    	const res = await Sales.api().contactCustomer(data.id, {
	    		contactFlg: contactFlg,
	    		customer: data.salesCustomerBuy.customer
	    	})
	    	if(res.response.status === 200){
	    		SalesCustomerBuy.update({
	    			id: res.response.data.id,
	    			data: res.response.data.data
	    		})
	    		toastr.success('Contact customer success', 'Success!', {timeOut: 1000})
	    	}
	    }
	},

	computed: {
		Sales(){
			var itemsPerPage = this.itemsPerPage
			var page = this.currentPage
			if(page == 1){
				this.offset = 0
			}
			else{
				this.offset = ((page - 1) * itemsPerPage) 
			}
			return Sales.query().with('salesCustomerBuy', (query) => {
				query.with('customer')
					.with('vehicleSuggests', (query) => {
						query.with('vehicle')
					})
			}).offset(this.offset).limit(itemsPerPage).get()
		},
		salesEdit(){
	        return Modal.getters('salesEdit')
	    }
	
	}

}
</script>