<template>
	<v-container>
			<v-row>
				<label-table
				title="Orders sold"
				>
				</label-table>
			</v-row>
			<v-row>
				<v-flex class="pa-4">
				    <v-card flat>
				    	<meu-search-sell></meu-search-sell>
			    		<table-sell></table-sell>
			    	</v-card> 	 	 
   				</v-flex>
			</v-row>

			<v-row>
				<label-table
				title="Orders bought"
				>
				</label-table>
			</v-row>
	
			<v-row>
				<v-flex class="pa-4">
				    <v-card flat>
				    	<meu-search-buy></meu-search-buy>
			    		<table-buy></table-buy>			   	  
			    	</v-card> 	 	 
   				</v-flex>
   		</v-row> 

	</v-container>	
</template>

<style type="text/css">

</style>

<script>

import TableSellComponent from './sell/Table.vue'
import MenuSearchSellComponent from './sell/MenuSearch.vue'

import TableBuyComponent from './buy/Table.vue'
import MenuSearchBuyComponent from './buy/MenuSearch.vue'


import Transaction from '@/store/models/transaction'
import TransactionDetailSell from '@/store/models/transaction_detail_sell'
import TransactionDetailbuy from '@/store/models/transaction_detail_buy'
import Modal from '@/store/models/modal'

import HTTP from '@/services/http'
export default{

	components: {
		'meu-search-sell': MenuSearchSellComponent,
		'table-sell': TableSellComponent,

		'meu-search-buy': MenuSearchBuyComponent,
		'table-buy': TableBuyComponent,
	},


	data(){
		return {

		}
	},

	mounted(){
		
	},

	methods: {
		
	  
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

	},

	destroyed() {
		Transaction.deleteAll()
		TransactionDetailSell.deleteAll()
		TransactionDetailbuy.deleteAll()
	}

}
</script>