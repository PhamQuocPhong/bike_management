<template>
<v-container>
  <v-layout row justify-center>
    <v-dialog v-model="salesEdit" persistent max-width="900" v-if="getSales" >
      <v-card>
        <v-card-title primary-title>
          Vehicle Info
        </v-card-title>

        <v-card-text class="mt-2">
              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
              >
                <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field 
                          label="Name"
                          v-model="getSales.salesCustomerBuy.customer.name"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6">
                          <v-text-field 
                          label="Phone number" 
                          type="text" 
                          v-model="getSales.salesCustomerBuy.customer.phoneNumber" 
                          ></v-text-field>
                        </v-col>
                      </v-row>

                      <v-row 
                        flex 
                        :align="alignment"
                      >
                          <v-col cols="3"> 
                            <v-select
                              label="Vehicle Type"
                              :items="vehicleTypes"
                              v-model="vehicleType"
                              item-text="name"
                              return-object
                              @input="changeVehicleType"
                            ></v-select>    
                          </v-col>

                          <v-col cols="4"> 
                            <v-select
                              :items="vehicles"
                              label="Vehicle"
                              multiple
                              hint="Chose vehicles for customer"
                              persistent-hint
                              item-text="name"
                              v-model="vehicleSelected"
                              return-object
                            ></v-select>    
                          </v-col>

                          <v-col 
                            cols="3"
                            class="text-center" 
                          >
                            <v-btn 
                                color="success" 
                                small
                                v-on:click="suggestVehicle"
                              >Add
                            </v-btn>
                          </v-col>
                      </v-row>

                      <v-row>
                        <v-col cols="12" >
                            <v-subheader>Vehicle Suggestions</v-subheader>
                            <v-expansion-panels multiple>
                              <v-expansion-panel 
                              v-for="(item, index) in vehicleSuggests"
                              :key="item.id">
                                <v-expansion-panel-header v-slot="{ open }">
                                  <v-row no-gutters>
                                    <v-col 
                                    cols="4"
                                    class="font-weight-bold"
                                    >
                                      {{item.vehicle.name}} 
                                      <v-icon color="green" v-if="item.selected">mdi-check-bold</v-icon>

                                      <v-icon v-else></v-icon>
                                    </v-col>
                                    <v-col
                                      cols="8"
                                      class="text--secondary"
                                    >
                                      <v-fade-transition leave-absolute>
                                      <!--   <span v-if="open">When do you want to travel?</span>
                                        <v-row
                                          v-else
                                          no-gutters
                                          style="width: 100%"
                                        >
                                        </v-row> -->
                                      </v-fade-transition>
                                    </v-col>
                                  </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  <v-row
                                    justify="space-around"
                                    :align="alignment"
                                    no-gutters
                                  >
                                    <v-col cols="1">
                                     <v-checkbox
                                        color="primary"
                                        v-model="item.selected"
                                        hide-details
                                        class="mt-0"
                                        :disabled="getSales.salesCustomerBuy.status == 'completed'"
                                      ></v-checkbox>
                                    </v-col>

                                    <v-col cols="2" >
                                      <v-img
                                      :src="item.vehicle.image"
                                      aspect-ratio="1.7"
                                      
                                      class="grey lighten-2 pa-4"
                                      >
                                      </v-img>
                                    </v-col>
                          
                                    <v-col cols="2">
                                      <v-card-text class="text-center">
                                        {{item.vehicle.price}}  $  
                                      </v-card-text>
                                    </v-col>

                                    <v-col cols="2">
                                     <v-card-text class="text-center">
                                         {{item.vehicle.color}}
                                      </v-card-text>
                                    </v-col>

                                    <v-col cols="5">
                                       {{item.vehicle.description}}
                                    </v-col>
                                  </v-row>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                          </v-expansion-panels>
                        </v-col>
                      </v-row>
                </v-container>
              </v-form>
          </v-card-text>

         <v-card-actions>
             <v-btn 
                v-if="getSales.salesCustomerBuy.status == 'confirm'"  
                color="blue darken-1" 
                text
                @click="transaction()"
              >
                Transaction</v-btn>
              <v-tooltip
                top
                v-else-if="getSales.salesCustomerBuy.status == 'completed'"  
               >
                <template v-slot:activator="{ on }">
                  <v-btn 
                  color="blue darken-1" 
                  text
                  dark v-on="on"
                   >
                    <v-icon>
                      mdi-check-circle
                    </v-icon> Transaction
                  </v-btn>
                </template>
                <span>Completed transaction</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click.native="close">Close</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>

  <transaction 
  v-if="salesTransaction"
  :vehiclesTransaction.sync="vehiclesTransaction"
  :infoTransaction.sync="infoTransaction"
  >
  </transaction>


</v-container>
</template>

<script>

// component  
import TransactionSell from './Transaction'

// store
import VehicleType from '@/store/models/vehicle_type'  
import Vehicle from '@/store/models/vehicle'
import VehicleSuggest from '@/store/models/vehicle_suggest' 
import Sales from '@/store/models/sales' 
import Modal from '@/store/models/modal'

export default {

    props: ['sales'],
    components: {
      'transaction': TransactionSell
    },

    created(){
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
    },

    data(){
      return{
        lazy: false,
        valid: true,
        getSales: this.sales,
        date: null,
        trip: {
          name: '',
          location: null,
          start: null,
          end: null,
        },
        locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
        alignment: 'center',
        justify: 'left',
        vehicleType: '',
        vehicles: [],
        vehicleSelected: [],
        transactionDialog: false,
        vehiclesTransaction: null,
        infoTransaction: null,
      }
    },

    methods: {

      close(){
        Modal.dispatch('salesEdit', {option: 'hide'})
      },

      transaction(){
          this.vehiclesTransaction = this.vehicleSuggests.filter((item) => item.selected === true)
          delete this.sales.salesCustomerBuy.vehicleSuggests
          if(this.vehiclesTransaction.length <= 0 ){
            toastr.warning('Please choose vehicle to payment', 'Warning!', {timeOut: 1000})
            return 
          }

          this.infoTransaction = this.sales.salesCustomerBuy
          Modal.dispatch('salesTransaction', {option: 'show'})
          // this.transactionDialog = true
      },

      async suggestVehicle(){
        const res = await Sales.api().suggestVehicles({
          sales: this.getSales,
          vehicleSelected: this.vehicleSelected
        })
        if(res.response.status === 200){
          var sales = res.response.data.data
          var vehicleSuggests = sales.salesCustomerBuy.vehicleSuggests
          VehicleSuggest.insert({
            data: vehicleSuggests
          })

          this.sales.salesCustomerBuy.status = sales.salesCustomerBuy.status
          toastr.success(res.response.data.message, 'Success!', {timeOut: 1000})
        }
      },

      async changeVehicleType(item){
        const vehicleTypeId = item.id
        const res = await Vehicle.api().fetchByType(vehicleTypeId)
        this.vehicles = res.response.data
      }
    },

    computed: {
      vehicleTypes(){
        return VehicleType.all()
      },  

      vehicleSuggests() {
        return VehicleSuggest.query().with('vehicle').where('salesCustomerBuyId', this.getSales.salesCustomerBuy.id).get()
      },

      salesEdit(){
          return Modal.getters('salesEdit')
      },

      salesTransaction(){
        return Modal.getters('salesTransaction')
      }

    }
  }

</script>