<template>
<div>
	<v-row no-gutters>
	   <v-col md="12" class="d-flex">
	      <v-btn class="mr-4" small color="warning" @click="reportTransactionSells()">Report all</v-btn>
	      <v-spacer></v-spacer>
	      <v-btn class="mr-4" small color="primary" @click="filterSellEvent()">Filter</v-btn>
	      <v-btn small color="success" @click="clearSearch()">Clear</v-btn>
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
	               v-model="formatStartDate"
	               label="Start date"
	               hint="MM/DD/YYYY format"
	               persistent-hint
	               prepend-icon="event"
	               v-on="on"
	               readonly
	               ></v-text-field>
	         </template>
	         <v-date-picker v-model="filter.startDate"  no-title ></v-date-picker>
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
	               v-model="formatEndDate"
	               label="End date"
	               hint="MM/DD/YYYY format"
	               persistent-hint
	               prepend-icon="event"
	               v-on="on"
	               readonly
	               ></v-text-field>
	         </template>
	         <v-date-picker v-model="filter.endDate" no-title ></v-date-picker>
	      </v-menu>
	   </v-col>
	   <v-spacer></v-spacer>
	   <v-col md="3" class="pr-6">
	      <v-select
	         :items="months"
	         label="Month"
	         class="ml-4"
	         v-model="filter.month"
	         ></v-select>
	   </v-col>
	</v-row>
</div>
</template>

<script>
export default {
	data(){
		return {
      		filter: {
  				startDate: '',
  				endDate: '',
  				month: '',
  				hidden: false
      		}
		}
	},

	methods: {
		clearSearch(){

	    	this.filter = {
    			startDate: '',
  				endDate: '',
  				month: '',
  				hidden: false
    		}
	    	this.filterEvent()
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
	},

	computed: {
		days(){
			return Array.from(Array(31), (_, i) => i + 1)
		},

		months(){
			 return Array.from(Array(12), (_, i) => i + 1)
		},
		formatStartDate() {
			return this.$helper.formatDate(this.filter.startDate)
	    },

	    formatEndDate() {
			return this.$helper.formatDate(this.filter.endDate)
	    },
	}


}
</script>