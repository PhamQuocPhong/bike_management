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
		      :items="receptionCustomerSells"
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
		    		{{$helper.indexColumn(item, receptionCustomerSells)}}
		    	</template>

		    	<template v-slot:item.customerName="{ item }">
		    		{{item.customer.name}}
		    	</template>

		    	<template v-slot:item.customerPhone="{ item }">
		    		{{item.customer.phoneNumber}}
		    	</template>

		    	<template v-slot:item.status="{ item }">
		    		<v-chip small :color="$helper.colorStatusTransaction(item)" dark >
		    			{{item.status}}	
		    		</v-chip>
		    	</template>

		    </v-data-table>
		    <div class="text-center pt-2">
		      <v-pagination v-model="page" :length="pageCount"></v-pagination>
		    </div>
		    <edit  v-if="receptionSellEdit" :editDialog.sync="receptionSellEdit" :receptionCustomerSell.sync="receptionCustomerSell"> </edit>
    	</v-card> 	 
    </v-flex>	
</template>

<script>

// store
import Modal from '@/store/models/modal'
import ReceptionCustomerSell from '@/store/models/reception_customer_sell'
import VehicleType from '@/store/models/vehicle_type'  

// component
import EditComponent from './Edit.vue'



export default{

	components: {'edit': EditComponent},
	async created(){

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

		var progress =  this.$Progress
		progress.start()
		const res = await ReceptionCustomerSell.api().fetchAll()
		if(res.response.status === 200){
			ReceptionCustomerSell.insert({data: res.response.data})
			progress.finish()
		}else {
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
	          { text: 'Customer name', value: 'customerName', width: 170 },
	          { text: 'Customer phone', value: 'customerPhone', width: 150 },
	          { text: 'Progess transaction', value: 'status', width: 150},
	          { text: 'Action', align: 'center', value: 'action', width: 200 },
	        ],

      		receptionCustomerSell: '',
      		modal: {
	          	reception: {
	            	sell: {
	              		edit: null
	            	}
	          	}
	        }
		}
	},

	mounted(){

	},

	methods: {
	    edit(item){
	    	this.receptionCustomerSell = {...item}
	    	Modal.dispatch('receptionSellEdit', {option: 'show'})
	    },

	},

	computed: {
		receptionCustomerSells(){
			return ReceptionCustomerSell.query().with('employee').with('customer').with('vehicleTests', (query) => {
				query.with('vehicleType')
			}).get()
		},

		receptionSellEdit(){
			return Modal.getters('receptionSellEdit')
		}

	}

}	
</script>