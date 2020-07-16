<template>
	<v-container>
			<v-row>
				<v-col md="12">
					<v-subheader class="title font-weight-bold">Order Sell</v-subheader>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-flex class="pa-4">
					    <v-card flat>
					    	<v-row no-gutters>
					    		<v-col md="12" class="d-flex">
					    			<v-btn class="mr-4" small color="warning" @click="reportTransactionSells()">Report all</v-btn>
					    			<v-spacer></v-spacer>
					    			<v-btn class="mr-4" small color="primary" @click="filterSellEvent()">Filter</v-btn>
					    			<v-btn small color="success" @click="clearSearch('sell')">Clear</v-btn>
					    		</v-col>
					    	</v-row>
					    	<v-row no-gutters class="align-center pb-6">
				    			<v-col md="3" cols="12" class="pr-6">
				    				<v-menu
		                              :close-on-content-click="false"
		                              transition="scale-transition"
		                              offset-y
		                              max-width="290px"
		                              min-width="290px"
		                            >
		                              <template v-slot:activator="{ on }">
		                                <v-text-field
		                                  v-model="formatStartDateSell"
		                                  label="Date"
		                                  hint="MM/DD/YYYY format"
		                                  persistent-hint
		                                  prepend-icon="event"
		                                  v-on="on"
		                                  readonly
		                                ></v-text-field>
		                              </template>
		                              <v-date-picker v-model="filter.sell.startDate"  no-title ></v-date-picker>
		                            </v-menu>
				    			</v-col>
				    			<v-col md="3" cols="12" class="pr-6">
				    				<v-menu
		                              :close-on-content-click="false"
		                              transition="scale-transition"
		                              offset-y
		                              max-width="290px"
		                              min-width="290px"
		                            >
		                              <template v-slot:activator="{ on }">
		                                <v-text-field
		                                  v-model="formatEndDateSell"
		                                  label="Date"
		                                  hint="MM/DD/YYYY format"
		                                  persistent-hint
		                                  prepend-icon="event"
		                                  v-on="on"
		                                  readonly
		                                ></v-text-field>
		                              </template>
		                              <v-date-picker v-model="filter.sell.endDate" no-title ></v-date-picker>
		                            </v-menu>
				    			</v-col>
				    			<v-spacer></v-spacer>
				    			<v-col md="3" class="pr-6">
				    				<v-select
				    				  :items="months"
				    				  label="Month"
				    				  class="ml-4"
				    				  v-model="filter.sell.month"
				    				></v-select>
				    			</v-col>

				    		</v-row>

				    		<v-simple-table class="table">
							    <template>
							      <thead>
						        	<tr>
						          		<th>No.</th>
				    					<th>Employee</th>
				    					<th>Customer</th>
				    					<th>Total item</th>
				    					<th>Sub total price</th>
				    					<th>Tax price</th>
				    					<th>Total price</th>
				    					<th>Date</th>
				    					<th class="text-center">Action</th>
							        </tr>
							      </thead>
							      <tbody>
							        <tr v-for="item in transactionSells" :key="item.id">
							        	<td>
							        		{{$helper.indexColumn(item, transactionSells)}}
							        	</td>
								    	<td>{{item.employee.fullName}}</td>
								    	<td>{{item.customer.name}}</td>
								    	<td>{{item.totalItem}}</td>
								    	<td>{{item.subTotalPrice | toCurrency}}</td>
								    	<td>{{item.taxPrice | toCurrency}}</td>
								    	<td>{{item.totalPrice | toCurrency}}</td>
								    	<td>{{item.date}}</td>

								    	<td class="text-center">
								    		<v-btn color="white" small class="primary mr-4" @click="edit(item, 'sell')">View</v-btn>
							    			<v-btn color="white" small class="success" @click="reportTransactionSell(item.id)">Report</v-btn>
								    	</td>
							        </tr>
							      </tbody>
							    </template>
						  	</v-simple-table>

		  					<v-row justify="center">
						        <v-col cols="8">
						          <v-container class="max-width">
						            <v-pagination
						              v-model="pagination.sell.currentPage"
						              class="my-4"
						              :length="pagination.sell.pageCounts"
						              @input="pagination.sell.nextPage"
						            ></v-pagination>
						          </v-container>
						        </v-col>
						    </v-row>		   	  
				    	</v-card> 	 	 
	   				</v-flex>
				</v-col>
			</v-row>

			<v-row>
				<v-col md="12">
					<v-subheader class="title font-weight-bold">Order Buy</v-subheader>
				</v-col>
			</v-row>

			
			<v-row>
				<v-col cols="12">
					<v-flex class="pa-4">
					    <v-card flat>
					    	<v-row no-gutters>
					    		<v-col md="12" class="d-flex">
					    			<v-btn class="mr-4" small color="warning" @click="reportTransactionBuys()">Report all</v-btn>
					    			<v-spacer></v-spacer>
					    			<v-btn class="mr-4" small color="primary" @click="filterBuyEvent()">Filter</v-btn>
					    			<v-btn small color="success"  @click="clearSearch('buy')">Clear</v-btn>
					    		</v-col>
					    	</v-row>

					    	<v-row no-gutters class="align-center pb-6">
				    			<v-col md="3" class="pr-6">
				    				<v-menu
		                              :close-on-content-click="false"
		                              transition="scale-transition"
		                              offset-y
		                              max-width="290px"
		                              min-width="290px"
		                            >
		                              <template v-slot:activator="{ on }">
		                                <v-text-field
		                                  v-model="formatStartDateBuy"
		                                  label="Date"
		                                  hint="MM/DD/YYYY format"
		                                  persistent-hint
		                                  prepend-icon="event"
		                                  v-on="on"
		                                  readonly
		                                ></v-text-field>
		                              </template>
		                              <v-date-picker v-model="filter.buy.startDate" no-title ></v-date-picker>
		                            </v-menu>
				    			</v-col>
				    			<v-col md="3" class="pr-6">
				    				<v-menu
		                              :close-on-content-click="false"
		                              transition="scale-transition"
		                              offset-y
		                              max-width="290px"
		                              min-width="290px"
		                            >
		                              <template v-slot:activator="{ on }">
		                                <v-text-field
		                                  v-model="formatEndDateBuy"
		                                  label="Date"
		                                  hint="MM/DD/YYYY format"
		                                  persistent-hint
		                                  prepend-icon="event"
		                                  v-on="on"
		                                  readonly
		                                ></v-text-field>
		                              </template>
		                              <v-date-picker v-model="filter.buy.endDate" no-title ></v-date-picker>
		                            </v-menu>
				    			</v-col>
				    			<v-spacer></v-spacer>
				    			<v-col md="3" class="pr-6">
				    				<v-select
				    				  :items="months"
				    				  label="Month"
				    				  class="ml-4"
				    				   v-model="filter.buy.month"
				    				></v-select>
				    			</v-col>
				    		</v-row>

				    		<v-simple-table class="table">
							    <template v-slot:default>
							      <thead>
						        	<tr>
						          		<th>No.</th>
				    					<th>Employee</th>
				    					<th>Customer</th>
				    					<th>Total item</th>
				    					<th>Sub total price</th>
				    					<th>Tax price</th>
				    					<th>Total price</th>
				    					<th>Date</th>
				    					<th class="text-center">Action</th>
							        </tr>
							      </thead>
							      <tbody>
							        <tr v-for="item in transactionBuys" :key="item.id">
							        	<td>
							        		{{$helper.indexColumn(item, transactionBuys)}}
							        	</td>
								    	<td>{{item.employee.fullName}}</td>
								    	<td>{{item.customer.name}}</td>
								    	<td>{{item.totalItem}}</td>
								    	<td>{{item.subTotalPrice}}</td>
								    	<td>{{item.taxPrice}}</td>
								    	<td>{{item.totalPrice}}</td>
								    	<td>{{item.date}}</td>

								    	<td class="text-center">
								    		<v-btn color="white" small class="primary mr-4" @click="edit(item, 'buy')">View</v-btn>
							    			<v-btn color="white" small class="success" @click="reportTransactionBuy(item.id)">Report</v-btn>
								    	</td>
							        </tr>
							      </tbody>
							    </template>
						  	</v-simple-table>

						  	<v-row justify="center">
						        <v-col cols="8">
						          <v-container class="max-width">
						            <v-pagination
						              v-model="pagination.buy.currentPage"
						              class="my-4"
						              :length="pagination.buy.pageCounts"
						              @input="pagination.buy.nextPage"
						            ></v-pagination>
						          </v-container>
						        </v-col>
						    </v-row>			   	  
				    	</v-card> 	 	 
	   				</v-flex>
				</v-col>
	   		</v-row> 
	   		<edit-sell  v-if="orderSellEdit" :transactionData.sync="transactionData" ></edit-sell>
	   		<edit-buy  v-if="orderBuyEdit"  :transactionData.sync="transactionData"></edit-buy>


	</v-container>	
</template>

<style type="text/css">

</style>

<script>

import EditSellComponent from './sell/Edit.vue'
import EditBuyComponent from './buy/Edit.vue'


import Transaction from '@/store/models/transaction'
import TransactionDetailSell from '@/store/models/transaction_detail_sell'
import TransactionDetailbuy from '@/store/models/transaction_detail_buy'
import HelperCommon from '@/helpers/common'
import Modal from '@/store/models/modal'

import HTTP from '@/services/http'
export default{

	components: {
		'edit-sell': EditSellComponent,
		'edit-buy': EditBuyComponent,
	},

	async created(){
		this.retrieveData()
	},

	data(){
		return {
			currentPage: 1,
	        itemsPerPage: 5,
	        search: '',
      		editDialog: false,
      		sales: '',
      		offset: 0,
      		editSellDialog: false,
      		editBuyDialog: false,
      		reportSellDialog: false,
      		reportBuyDialog: false,
      		transactionData:  null,
      		pageSellCounts: 1,
      		pageSellBuyCounts: 1,

      		pagination: {
      			buy: {
      				currentPage: 1, 
	      			pageCounts: 1,
	      			nextPage: 1,
      			},
      			sell: {
      				currentPage: 1, 
	      			pageCounts: 1,
	      			nextPage: 1,
      			}
      		},

      		filter: {
      			sell: {
      				startDate: '',
      				endDate: '',
      				month: '',
      				hidden: false
      			},

      			buy: {
      				startDate: '',
      				endDate: '',
      				month: '',
      				hidden: false
      			}	
      		}

		}
	},

	mounted(){
		
	},

	methods: {
	    edit(transactionData, option){

	    	// event click 
	    	if(option === 'sell'){
	    		Modal.dispatch('orderSellEdit', {option: 'show'})
	    		this.transactionData = transactionData
	    	}else{
	    		Modal.dispatch('orderBuyEdit', {option: 'show'})
	    		this.transactionData = transactionData
	    	}
	    },

	    clearSearch(mode){
	    	if(mode === 'sell'){
	    		this.filter.sell = {
	    			startDate: '',
      				endDate: '',
      				month: '',
      				hidden: false
	    		}
	    		this.filterSellEvent()
	    	}
	    	this.filter.buy = {
	    			startDate: '',
      				endDate: '',
      				month: '',
      				hidden: false
	    		}
	    	this.filterBuyEvent()
	    },
		
	    async reportTransactionBuy(transactionId){

	    	var loader = this.$loading.show()
	    	var res = await HTTP.get('/report/buy' , {
	    		params: {
	    			transactionId: transactionId
	    		},

	    		responseType: 'arraybuffer',
			   	headers: {
			     'Accept': 'application/pdf'
			   }
	    	})
	    	const blob = new Blob([res.data], {type: 'application/pdf'})
	        const link = document.createElement('a')
	        link.href = window.URL.createObjectURL(blob)
	        link.download = `report.pdf`
	        link.click()
	        loader.hide()
	    },

	    async reportTransactionSell(transactionId){
	    	var loader = this.$loading.show()
	    	var res = await HTTP.get('/report/sell' , {
	    		params: {
	    			transactionId: transactionId
	    		},

	    		responseType: 'arraybuffer',
			   	headers: {
			     'Accept': 'application/pdf'
			   }
	    	})
	    	const blob = new Blob([res.data], {type: 'application/pdf'})
	        const link = document.createElement('a')
	        link.href = window.URL.createObjectURL(blob)
	        link.download = `report.pdf`
	        link.click()
	        loader.hide()
	    },

	    async reportTransactionSells(){
	    	var loader = this.$loading.show()
	    	var filterSell = this.filter.sell
	    	var res = await HTTP.get('/report/sell' , {
	    		params: {
	    			startDate: filterSell.startDate,
	    			endDate: filterSell.endDate,
	    			month: filterSell.month
	    		},

	    		responseType: 'arraybuffer',
			   	headers: {
			     'Accept': 'application/pdf'
			   }
	    	})
	    	const blob = new Blob([res.data], {type: 'application/pdf'})
	       const link = document.createElement('a')
	       link.href = window.URL.createObjectURL(blob)
	       link.download = `report.pdf`
	       link.click()
	       	        loader.hide()
	    },

	    async reportTransactionBuys(){
	    	var loader = this.$loading.show()
	    	var filterBuy = this.filter.buy
	    	var res = await HTTP.get('/report/buy' , {
	    		params: {
	    			startDate: filterBuy.startDate,
	    			endDate: filterBuy.endDate,
	    			month: filterBuy.month
	    		},
	    		responseType: 'arraybuffer',
			   	headers: {
			     'Accept': 'application/pdf'
			   }
	    	})
	    	const blob = new Blob([res.data], {type: 'application/pdf'})
	       const link = document.createElement('a')
	       link.href = window.URL.createObjectURL(blob)
	       link.download = `report.pdf`
	       link.click()
	    	loader.hide()
	    },

	    async retrieveData(){

			var progress =  this.$Progress
			progress.start()

		    const resSell = await Transaction.api().fetchSellPaging(this.currentPage, this.itemsPerPage)
			if(resSell.response.status === 200){
				Transaction.insert({data: resSell.response.data.data})
				this.pagination.sell.pageCounts = resSell.response.data.pageCounts

			}

			const resBuy = await Transaction.api().fetchBuyPaging(this.currentPage, this.itemsPerPage)
			if(resBuy.response.status === 200){
				Transaction.insert({data: resBuy.response.data.data})
				this.pagination.buy.pageCounts = resBuy.response.data.pageCounts
			}

			progress.finish()
	    },

	    async filterSellEvent(){
	    	await Transaction.delete((transaction) => {
			  return transaction.mode === "sell"
			})
	    	var filterSell = this.filter.sell
	    	const res = await Transaction.api().fetchSellPaging(
	    		this.currentPage, 
	    		this.itemsPerPage,
	    		filterSell.startDate,
	    		filterSell.endDate,
	    		filterSell.month
	    	)
	    	if(res.response.status === 200){
	    		Transaction.insert({data: res.response.data.data})
				this.pagination.sell.pageCounts = res.response.data.pageCounts
	    	}
	    },

	    async filterBuyEvent(){
	    	await Transaction.delete((transaction) => {
			  return transaction.mode === "buy"
			})
	    	var filterBuy = this.filter.buy
	    	const res = await Transaction.api().fetchBuyPaging(
	    		this.currentPage, 
	    		this.itemsPerPage,
	    		filterBuy.startDate,
	    		filterBuy.endDate,
	    		filterBuy.month
	    	)

	    	if(res.response.status === 200){
	    		Transaction.insert({data: res.response.data.data})
				this.pagination.buy.pageCounts = res.response.data.pageCounts
	    	}
	    }
	},

	watch: {

	},

	computed: {
		transactionSells(){
			var data = Transaction.query().with('transactionDetailSells', (query) => {
				query.with('vehicle')
			}).with('employee').with('customer').where('mode', 'sell').get()
			data = data.map((item) => ({
				...item,
				totalItem: this.$helper.totalItem(item.transactionDetailSells, 'quantity')
			}))
			return data
		},

		transactionBuys(){
			var data = Transaction.query().with('transactionDetailBuys', (query) => {
				query.with('vehiclePurchase', (query) => {
					query.with('vehicleRepair')
				})
			})
			.with('employee')
			.with('customer')
			.where('mode', 'buy')
			.get()

			data = data.map((item) => ({
				...item,
				totalItem: item.transactionDetailBuys.length
			}))
			return data
		},

		days(){
			return Array.from(Array(31), (_, i) => i + 1)
		},

		months(){
			 return Array.from(Array(12), (_, i) => i + 1)
		},

		formatStartDateSell() {
			return this.$helper.formatDate(this.filter.sell.startDate)
	    },

	    formatEndDateSell() {
			return this.$helper.formatDate(this.filter.sell.endDate)
	    },

	    formatStartDateBuy() {
			return this.$helper.formatDate(this.filter.buy.startDate)
	    },

	    formatEndDateBuy() {
			return this.$helper.formatDate(this.filter.buy.endDate)
	    },

	    orderBuyEdit(){
        	return Modal.getters('orderBuyEdit')
     	},

        orderSellEdit(){
	        return Modal.getters('orderSellEdit')
	    }

	}

}
</script>