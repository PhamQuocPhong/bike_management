<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="warehouseCreate" persistent max-width="900">
        <v-card>
            <v-card-title class="headline d-flex pb-4"> Create vehicle </v-card-title>

            <v-card-text class="mt-4">
                <v-form
                  ref="form"
                  v-model="valid"
                  :lazy-validation="lazy"
                >
                  <v-container>
                    <v-row v-if="newVehicle">

                      <v-col cols="6">
                        <v-text-field 
                        label="Code"
                        v-model="newVehicle.code"
                        :rules="[
                           $validation.required(newVehicle.code, 'Code'),
                        ]" 
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field 
                        label="Registration plate"
                        v-model="newVehicle.name"
                        :rules="[
                           $validation.required(newVehicle.registrationPlate, 'Registration plate'),
                        ]" 
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field 
                        label="Name"
                        v-model="newVehicle.name"
                        :rules="[
                           $validation.required(newVehicle.name, 'Name'),
                        ]" 
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                       <v-select
                        :items="vehicleTypes"
                        v-model="newVehicle.vehicleType"
                        label="Type"
                        item-text="name"
                        return-object
                        :rules="[
                           $validation.required(newVehicle.vehicleType, 'Vehicle type'),
                        ]" 
                      ></v-select>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field 
                        label="Color" 
                        type="text" 
                        v-model="newVehicle.color"
                        :rules="[
                           $validation.required(newVehicle.buyPrice, 'Buy price'),
                        ]" 
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field 
                        label="Buy price" 
                        type="number" 
                        v-model="newVehicle.buyPrice" 
                         :rules="[
                           $validation.required(newVehicle.buyPrice, 'Buy price'),
                         ]"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="6">
                        <v-text-field 
                        label="Price" 
                        type="number" 
                        v-model="newVehicle.price" 
                        :rules="[
                           $validation.required(newVehicle.price, 'Price'),
                        ]" 
                        ></v-text-field>
                      </v-col>
                    </v-row>      

                    <v-row>
                      <v-col cols="12">
                        <upload :image.sync="image" ></upload>
                      </v-col>  
                    </v-row>                   
                  </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
              <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

  </div>
</template>

<script>


import VehicleType from '@/store/models/vehicle_type'  
import Vehicle from '@/store/models/vehicle' 
import Modal from '@/store/models/modal'

import UploadFileComponent from '@/components/custom/UploadFile.vue'


export default {

    props: [ 'createDialog'],

    components: {
      'upload': UploadFileComponent
    },

    created(){

    },

    data(){
      return {
        valid: true,
        lazy: false,
        image: null
      }
    },

    methods: {
      async save(){
        if(this.$refs.form.validate()){
          this.newVehicle.image = this.image
          this.newVehicle.quantity = 1
          var data  = this.newVehicle

          const res = await Vehicle.api().create(JSON.stringify(data))
        }
      },

      close(){
        Modal.dispatch('warehouseCreate', {option: 'hide'})
      }
    },


    computed: {
      newVehicle(){
        return new Vehicle()
      },

      vehicleTypes(){
        return VehicleType.all()
      },

      warehouseCreate(){
        return Modal.getters('warehouseCreate')
      }

    }

  }

</script>