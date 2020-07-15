<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="dialogEdit" persistent max-width="900" v-if="getVehiclePurchase">
        <v-card>
            <v-card-title class="headline d-flex pb-4"> Edit Customer Buy </v-card-title>
            <v-card-text class="mt-4">
                <v-form
                  ref="form"
                  v-model="valid"
                  :lazy-validation="lazy"
                >
                  <v-container>
                        <v-row v-if="getVehiclePurchase">

                          <v-col cols="6">
                            <v-text-field 
                            label="Customer name" 
                            v-model="getVehiclePurchase.name"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="6">
                            <v-text-field 
                            label="Code" 
                            v-model="getVehiclePurchase.code"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="6">
                            <v-text-field 
                            label="Registration Plate" 
                            type="text" 
                            v-model="getVehiclePurchase.registrationPlate" 
                            ></v-text-field>
                          </v-col>

                          <v-col cols="6">
                            <v-text-field 
                            label="Status" 
                            type="text" 
                            v-model="getVehiclePurchase.status" 
                            ></v-text-field>
                          </v-col>

                          <v-col cols="6">
                            <v-text-field 
                            label="Price" 
                            type="text" 
                            v-model="getVehiclePurchase.price" 
                            ></v-text-field>
                          </v-col>

                          <v-col cols="6">

                            <v-img  height="50" width="100" contain :src="getVehiclePurchase.image"></v-img>

                           </v-col>
                        </v-row>

                        <v-row 
                          class="d-flex"
                          align="center"
                        >
                        </v-row>

                  </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
              color="blue darken-1" 
              text 
              @click="save()"
              > 
                Save
              </v-btn>
              <v-btn 
              color="blue darken-1" 
              text 
              @click="close()
              ">
                Close
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>

// store
import VehicleRepair from '@/store/models/vehicle_repair'
import VehiclePurchase from '@/store/models/vehicle_purchase'


// hepler
import HelperCommon from '@/helpers/common'

export default {

    props: ['dialogEdit', 'vehiclePurchase'],

    data(){
      return {
        right: 10,
        top: 10,
        valid: true,
        lazy: false,
        // rule form
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        search: '',
        itemsPerPageList: [5, 10, 15],
        dialogVehicleTest: false,
        role: 'reception',
        getVehiclePurchase: this.vehiclePurchase,
      }
    },

    mounted(){

    },


    methods: {

      close() {
          this.$emit('update:dialogEdit', false)
      },

      async save(){

        if (this.$refs.form.validate()) {

          const vehiclePurchaseUpdate = await VehiclePurchase.api().update(this.getVehiclePurchase.id, this.getVehiclePurchase)
          VehiclePurchase.update({data: vehiclePurchaseUpdate.response.data.data})

          if(vehiclePurchaseUpdate.response.status === 200 && this.checkVehicleRepairExist()){
              toastr.success('<p>Update success!</p>', 'Success', {timeOut: 500})
              this.$emit('update:dialogEdit', false)
          }

          if(!this.checkVehicleRepairExist()){
            var dataVehicleRepairStore = {
              vehiclePurchaseId: this.getVehiclePurchase.id,
              approveFlg: this.vehicleRepair.approveFlg === true ? 1 : 0,
              note: 'Oke',
              startDate: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }

            const res = await VehicleRepair.api().create(dataStore)
            if(res.response.status === 200){      
              await VehicleRepair.insert({data: res.response.data.data})
              toastr.success('<p>Change success!</p>', 'Success', {timeOut: 500})
              this.$emit('update:dialogEdit', false)
            }
          }
        }
        else{
          console.log("Fail")
        }
      },

      checkVehicleRepairExist(){
        return VehicleRepair.query().where('vehiclePurchaseId', this.getVehiclePurchase.id).exists()
      },

      colorStatusBike: HelperCommon.colorStatusBike,


    },

  
    computed: {

      vehicleRepair: {

        get(){
          if(!this.getVehiclePurchase.vehicleRepair){
            return Object.create(null)
          }else{
            return this.getVehiclePurchase.vehicleRepair
          }
        },


      },

      approveFlg:{

        set(val){
          if(this.vehicleRepair)
            this.vehicleRepair.approveFlg = val          
        },

        get(){

          if(Object.entries(this.vehicleRepair).length === 0){
            return false
          }else{
            if(this.vehicleRepair.approveFlg === 1){
              return true
            }
            return false
          }
        }
      }
    }

  }

</script>