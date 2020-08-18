<template>
  <v-layout row justify-center>
    <v-dialog v-model="technicalTestEdit" persistent max-width="700" v-if="getVehicleTest">
      <v-card>
          <v-card-title class="headline d-flex pb-4"> Technical Test </v-card-title>

          <v-card-text class="mt-4">
              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
              >
                <v-container>
                      <v-row v-if="getVehicleTest">                
                        <v-col cols="12" md="4" sm="6">

                          <v-select
                            :items="vehicleTypes"
                            v-model="getVehicleTest.vehicleType"
                            :readonly="role == `technical`"
                            label="Vehicle Type"
                            item-text="name"
                            return-object
                            regular 
                          ></v-select>
                        </v-col>

                      <v-col cols="12" md="4" sm="6">
                          <v-text-field 
                          label="Bike Code" 
                          type="text" 
                          v-model="getVehicleTest.bikeCode"
                          :readonly="role == `technical`"
                          regular 
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" sm="6">
                          <v-text-field 
                          label="Registration Plate" 
                          type="text" 
                          v-model="getVehicleTest.registrationPlate"
                          :readonly="role == `technical`"
                          regular 
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4" sm="6">
                          <v-select
                            :items="statusBikes"
                            v-model="getVehicleTest.bikeStatus"
                            :readonly="role == `reception`"
                            label="Bike Status" 
                            return-value
                            regular 
                            :rules="[
                               $validation.required(getVehicleTest.bikeStatus, 'Bike status'), 
                            ]"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" md="4" sm="6">
                          <v-text-field 
                            label="Min price" 
                            type="number" 
                            v-model="getVehicleTest.minPrice"
                            :readonly="role == `reception`"
                            :rules="[
                              $validation.required(getVehicleTest.minPrice, 'Min price'), 
                              $validation.minPrice(getVehicleTest.minPrice, getVehicleTest.maxPrice)
                            ]" 
                          ></v-text-field>
                        </v-col>


                        <v-col cols="12" md="4" sm="6">
                          <v-text-field 
                            label="Max price" 
                            type="number" 
                            v-model="getVehicleTest.maxPrice"
                            :rules="[
                              $validation.required(getVehicleTest.maxPrice, 'Max price'), 
                              $validation.maxPrice(getVehicleTest.maxPrice, getVehicleTest.minPrice)
                            ]" 
                            :readonly="role == `reception`"
                          ></v-text-field>
                        </v-col>

                      </v-row>
                </v-container>
              </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn color="blue darken-1" outlined text @click="save()">Save</v-btn>
              <v-btn color="blue darken-1" outlined text @click.native="close()">Close</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

import Modal from '@/store/models/modal'

import ReceptionCustomerSell from '@/store/models/reception_customer_sell'
import VehicleTest from '@/store/models/vehicle_test'
import VehicleType from '@/store/models/vehicle_type'  

  export default {

    props: ['vehicleTest', 'role'],

    data(){
      return {
        right: 10,
        top: 10,
        valid: true,
        lazy: false,
        getVehicleTest: this.vehicleTest
      }
    },

    mounted(){

    },

    methods: {
      close() {
         Modal.dispatch('technicalTestEdit', {option: 'hide'})
      },

      async save(){


        if (this.$refs.form.validate()) {
          var vehicleTestId = this.getVehicleTest.id
          var vehicleTestUpdate  = this.getVehicleTest
          var res = await VehicleTest.api().update(vehicleTestId, vehicleTestUpdate)

          if(res.response.status === 200){
            VehicleTest.update({
              where: vehicleTestId,
              data: this.getVehicleTest
            })
            toastr.success(res.response.data.message, 'Success!', {timeOut: 1000})
            Modal.dispatch('technicalTestEdit', {option: 'hide'})
          }
        }
      },
    },
  
    computed: {
      vehicleTypes(){
        return VehicleType.all()
      },

      statusBikes(){
        return this.$enum.progressVehicleBuy.list
      },

      technicalTestEdit(){
        return Modal.getters('technicalTestEdit')
      } 
   
    }
}

</script>