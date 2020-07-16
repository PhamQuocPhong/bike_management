<template>
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
		    <v-data-table
		      :headers="headers"
		      :items="receptionCustomerBuys"
		      :page.sync="page"
		      :items-per-page="itemsPerPage"
		      hide-default-footer
		      class="elevation-1"
		      @page-count="pageCount = $event"
		    
		    >	
		    	<template v-slot:item.action="{ item }">

		    		<v-btn color="white" small class="primary mr-4" @click="edit(item)" >
						<v-icon>mdi-square-edit-outline</v-icon>
					</v-btn>
	    			<v-btn color="white" small class="warning">
	    				<v-icon>mdi-delete-outline</v-icon>
	    			</v-btn>

		    	</template>


		    	<template v-slot:item.no="{ item }">
		    		{{$helper.indexColumn(item, receptionCustomerBuys)}}
		    	</template>

		    	<template v-slot:item.customerName="{ item }">
		    		{{item.salesCustomerBuy.customer.name}}
		    	</template>

		    	<template v-slot:item.email="{ item }">
		    		{{item.salesCustomerBuy.customer.email}}
		    	</template>

		    	<template v-slot:item.customerPhone="{ item }">
		    		{{item.salesCustomerBuy.customer.phoneNumber}}
		    	</template>

		    	<template v-slot:item.customerRequire="{ item }">
		    		{{item.salesCustomerBuy.customerRequire}}
		    	</template>

		    	<template v-slot:item.progress="{ item }">
		    		<v-chip small :color="$helper.colorStatusTransaction(item.salesCustomerBuy)" dark >
		    			{{item.salesCustomerBuy.status}}
		    		</v-chip>
		    	</template>

		    </v-data-table>
		    <div class="text-center pt-2">
		      <v-pagination v-model="page" :length="pageCount"></v-pagination>
		    </div>		  
    	</v-card> 	 

    	<edit v-if="receptionBuyEdit" :receptionCustomerBuy.sync="receptionCustomerBuy" ></edit>

    </v-flex>	
</template>

<script>
// component
import EditCustomerBuy from '@/components/reception/buy/Edit.vue'

// store
import ReceptionCustomerBuy from '@/store/models/reception_customer_buy'
import Modal from '@/store/models/modal'



export default{

	components: {
		'edit': EditCustomerBuy
	},

	async created(){
		var progress =  this.$Progress
		progress.start()
		const res = await ReceptionCustomerBuy.api().fetchAll()
		if(res.response.status === 200){
			ReceptionCustomerBuy.insert({data: res.response.data.data})
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
	          { text: 'No.', value: 'no', width: 70 },
	          { text: 'Customer name', value: 'customerName', width: 200 },
	          { text: 'Email', value: 'email', width: 150 },
	          { text: 'Customer phone', value: 'customerPhone', width: 150 },
	          { text: 'Require', value: 'customerRequire', width: 300 },
	          { text: 'Progess', value: 'progress', width: 120},
	          { text: 'Action', align: 'center', value: 'action', width: 200 },
	        ],
      		receptionCustomerBuy: '',
      		dialogBuy: false
		}
	},

	mounted(){
	},

	methods: {

		edit(item){
			
			this.receptionCustomerBuy = {...item}
			Modal.dispatch('receptionBuyEdit', {option: 'show'})
		},

	},

	computed: {
		receptionCustomerBuys(){
			return ReceptionCustomerBuy.query().with('salesCustomerBuy', (query) => {
				query.with('customer')
			}).get()
		},
		receptionBuyEdit(){
			return Modal.getters('receptionBuyEdit')
		}
	}

}	
</script>