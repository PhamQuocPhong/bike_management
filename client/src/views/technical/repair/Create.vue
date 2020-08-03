<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="createDialog" persistent max-width="900" >
        <v-card>
            <v-card-title class="headline d-flex pb-4"> Add accessories </v-card-title>
            <v-card-text class="mt-4">
                <v-form
                  ref="form"
                  v-model="valid"
                  :lazy-validation="lazy"
                >
                  <v-container>
                        <v-row>

                          <v-col cols="6">
                            <v-text-field 
                            label="Accessory name" 
                            v-model="accessory"
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
                              ref="menu1"
                              v-model="menu1"
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
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
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
import Employee from '@/store/models/employee'
import TechnicalRepair from '@/store/models/technical_repair'


export default {

    props: ['createDialog'],


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
        employeeTechnicalTests: null,

        date: '',
        dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
        menu1: false,
        accessory: null,
        employee: null

      }
    },

    mounted(){
      this.retrieveEmployeeTechnicalTests()
    },


    methods: {

      async save(){
        var vm = this
        if (vm.$refs.form.validate()) {
          var dataStore = {
            accessory: vm.accessory,
            employeeId: vm.employee.id,
            startDate: vm.parseDate(vm.formatStartDate),
            type: 2,
            vehicleRepairId: vm.vehicleRepairId
          }
          const res = await TechnicalRepair.api().create(dataStore)
          if(res.response.status === 200){
            TechnicalRepair.insert({data: res.response.data.data})
            toastr.success(res.response.data.message, 'Success!', {timeOut: 1000})
     
          }

        }
        else{
          console.log("Fail")
        }
      },

      close(){
        this.$emit('update:createDialog', false)
      },

      formatDate (date) {

        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },

    computed: {
      getVehicleRepair(){
        return VehicleRepair.query().where('id', this.vehicleRepairId).get()
      },

      formatStartDate () {
        return this.formatDate(this.date)
      },
    } 


  
  

  }

</script>