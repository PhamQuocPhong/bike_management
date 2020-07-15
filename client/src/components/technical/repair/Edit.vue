<template>
  <v-layout row justify-center>
    <v-dialog v-model="editDialog" persistent max-width="700" >
      <v-card>
          <v-card-title class="headline d-flex pb-4"> Technical Repair Edit </v-card-title>

          <v-card-text class="mt-4">
              <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
              >
                <v-container>
                      <v-row >                
                        <v-col cols="6">

                          <v-text-field
                            v-model="getTechnicalRepair.accessory"
                            label="Accessory"
                            regular 
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6">

                          <v-text-field
                            v-model="getTechnicalRepair.price"
                            label="Price"
                            regular 
                          ></v-text-field>
                        </v-col>


                        <v-col cols="6">
                            <v-menu
                              ref="startDate1"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="formatStartDate"
                                  label="Date"
                                  hint="MM/DD/YYYY format"
                                  persistent-hint
                                  prepend-icon="event"
                                  @blur="getTechnicalRepair.startDate = parseDate(dateFormatted)"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="getTechnicalRepair.startDate" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col cols="6">
                            <v-menu
                              ref="startDate2"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="formatEndDate"
                                  label="Date"
                                  hint="MM/DD/YYYY format"
                                  persistent-hint
                                  prepend-icon="event"
                                  @blur="getTechnicalRepair.endDate = parseDate(dateFormatted)"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="getTechnicalRepair.endDate" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col cols="6">
                          <v-checkbox label="Finished" v-model="finishFlag" ></v-checkbox>
                        </v-col>
                      </v-row>
                </v-container>
              </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
            <v-btn color="blue darken-1" text @click.native="close">Close</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

import HelperCommon from '@/helpers/common'

import TechnicalRepair from '@/store/models/technical_repair'

  export default {

    props: ['editDialog', 'technicalRepair'],

    data(){
      return {
        right: 10,
        top: 10,
        valid: true,
        lazy: false,
        // rule form
        bikeCodeRule: [
          v => !!v || 'Code bike is required!',
          v => /[0-9A-z]+/.test(v) || 'Code bike include number & word',
        ],

        bikeStatusRule: [
          v => !!v || 'Status bike is required!',
        ],

        rangePriceRule: [
          v => !!v || 'Range price is required!',
        ],
        getTechnicalRepair: this.technicalRepair,
        dateFormatted: HelperCommon.formatDate(new Date().toISOString().substr(0, 10)),
      
      }
    },

    mounted(){

    },


    methods: {
      close() {
        this.$emit('update:editDialog', false)
      },
      async save(){
        if (this.$refs.form.validate()) {
          const res = await TechnicalRepair.api().update(this.getTechnicalRepair.id, this.getTechnicalRepair)
          if(res.response.status === 200){
            TechnicalRepair.update({
              where: this.getTechnicalRepair.id,
              data:  res.response.data.data
            })
            toastr.success(res.response.data.message, 'Success!', {timeOut: 1000})
            this.$emit('update:editDialog', false)
          }
        }
      },
      parseDate: HelperCommon.parseDate

    },
  
    computed: {
      vehicleTypes(){
        return VehicleType.all()
      },

      statusBikes(){
        return this.$enum.progressVehicleBuy.list
      },

      formatStartDate () {
        return HelperCommon.formatDate(this.getTechnicalRepair.startDate)
      },
      formatEndDate () {
        return HelperCommon.formatDate(this.getTechnicalRepair.endDate)
      },
  
      finishFlag: {
        get(){
          return this.getTechnicalRepair.finishFlg   
        },
        set(val){
          this.getTechnicalRepair.finishFlg = (val === true) ? 1 : 0 
        }
      } 
    }

  }

</script>