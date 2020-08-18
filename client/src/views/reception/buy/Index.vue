<template>
<div id="reception">
	<v-container>
	    <label-table
		title="Reception buy"
		>
		</label-table>

	    <v-flex xs12 md6 class="mt-6 mx-auto mb-8">
	      <v-card :class="{'pa-4': !isMobile}" :flat="isMobile">
	        <v-form
	          ref="form"
	          v-model="valid"
	          :lazy-validation="lazy"
	          md6
	        >
		       	<v-row>
		       		<v-flex>
		       		 	<p class="text-center title">Customer Info</p> 
		       		</v-flex>
		       	</v-row>	

		        <v-text-field
		            v-model="newCustomer.name"
		            :rules="[
                       $validation.required(newCustomer.name, 'Customer name'), 
                    ]"
		            label="Full Name"
		        ></v-text-field>

		        <v-text-field
		            v-model="newCustomer.phoneNumber"
		            label="Phone Number"
		            :rules="[
                       $validation.required(newCustomer.phoneNumber, 'Phone number'), 
                    ]"
		        ></v-text-field>

		        <v-text-field
		            v-model="newCustomer.email"
		            label="Email"
		            :rules="[
                       $validation.required(newCustomer.email, 'Email'), 
                       $validation.email(newCustomer.email), 
                    ]"
		        ></v-text-field>

		        <v-text-field
		            v-model="newCustomer.address"
		            label="Address"
		        ></v-text-field>

				<div  class="mb-6">
					<v-textarea
						label="Require"
						rows="5"
						:filled="true"
						:solo="true"
						:noResize="true"
						v-model="newReceptionCustomerBuy.customerRequire"
					>
					</v-textarea>
				</div>

		        <v-btn
		            color="primary"
		            class="mr-4"
		            @click="create"
		        >
		            Save
		        </v-btn>
		        <v-btn
		            color="warning"
		            @click="reset"
		        >
		            Reset 
		       	</v-btn>
	        </v-form>
	      	</v-card>
	    </v-flex>

	    <hr>

	    <customer-buy></customer-buy>

	</v-container>
</div>
</template>

<script>


// Model
import ReceptionCustomerBuy from '@/store/models/reception_customer_buy'
import TestBike from '@/store/models/vehicle_test'
import Customer from '@/store/models/customer'   

// component
import CustomerBuyComponent from './CustomerBuy.vue'
export default {


	components: {
		'customer-buy': CustomerBuyComponent
	},


	created(){
		this.onResize()
	},

	data() {
      return {
      	
        valid: true,
        name: '',
        nameRules: [
        	v => !!v || 'Name is required',
        ],
        phoneRules: [
        	v => !!v || 'Phone number is required',
        ],

        emailRules: [
        	v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        lazy: false,
        isMobile: false
       
      }
    },

    mounted(){

    },

    methods: {

    	onResize(){
	    	if (window.innerWidth < 769)
           		this.isMobile = true;
          	else
            	this.isMobile = false;
	    },

	    reset () {
	        this.$refs.form.reset()
	    },
	    create: async function(){

	    	var vm = this
	    	if (this.$refs.form.validate()) {

	        	var data = {...this.newReceptionCustomerBuy, ...this.newCustomer}
	        	var res = await ReceptionCustomerBuy.api().create(data)
	        	if(res.response.status === 200){
	        		ReceptionCustomerBuy.insert({
	        			data: res.response.data.data
	        		})
	        		toastr.success(res.response.data.message, 'Success!', {timeOut: 1000})
	        		this.$refs.form.reset()
	        	}
	        }
	        else{
	          console.log("Fail")
	        }
	    },
    },

    computed: {
		customers(){
			return Customer.all()
		},

		newCustomer(){
			return new Customer()
		},

		newReceptionCustomerBuy(){
			return new ReceptionCustomerBuy()
		},
    }
  }
</script>