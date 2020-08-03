<template>
  <v-layout row justify-center>
    <v-dialog v-model="orderBuyEdit"  max-width="1200">
      <v-card>
          <v-card-title class="headline d-flex pb-4"> Detail Buy Transaction </v-card-title>
          <v-card-text class="mt-4">
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <div class="d-flex">
                      <label>Employee name:</label>
                      <p class="pl-4 font-weight-bold">{{customer.name}}</p>
                    </div>

                    <div class="d-flex">
                      <label>Customer name:</label>
                       <p class="pl-4 font-weight-bold">{{customer.phoneNumber}}</p>
                    </div>
                  </v-col>

                  <v-col cols="6">
                     <div class="d-flex">
                      <label>Date:</label>
                      <p class="pl-4 font-weight-bold">{{$helper.formatDate(transactionData.date)}}</p>
                    </div>
                  </v-col>
                </v-row>

                <v-subheader>Details</v-subheader>
                <v-simple-table class="table">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Vehicle name</th>
                        <th>Color </th>
                         <th>Image</th>
                        <th>Registration Plate</th>
                        <th>Code</th>
                        <th>Status</th>
                        <th>Buy Price</th>
                        <th>Fix Price</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in transactionDetails" :key="item.id">
                      <td>
                          {{$helper.indexColumn(item, transactionDetails)}}
                      </td>
                      <td>{{item.vehicle.name}}</td>
                      <td>{{item.vehicle.color}}</td>
                      <td>
                        <v-img :src="item.image" width="100" heght="50"></v-img>
                      </td>
                       <td>{{item.vehicle.registrationPlate}}</td>
                      <td>{{item.vehicle.code}}</td>
                      <td>{{item.vehicle.status}}</td>
                      <td>{{item.vehicle.price}}</td>
                      <td>{{item.vehicleRepair.fixPrice}}</td>

                      <td class="text-center">
                        <v-btn color="white" small class="primary mr-4" @click="report(item)">Report</v-btn>
                      </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click.native="close()">close</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import ReceptionCustomerSell from '@/store/models/reception_customer_sell'
import VehicleTest from '@/store/models/vehicle_test'
import Transaction from '@/store/models/transaction'
import TransactionDetailBuy from '@/store/models/transaction_detail_buy'
import Modal from '@/store/models/modal'


import HTTP from '@/services/http'

export default {

    props: ['editBuyDialog', 'transactionData'],

    data(){
      return {
        right: 10,
        top: 10,
        valid: true,
        lazy: false,

        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        search: '',
        itemsPerPageList: [5, 10, 15],
        reducePrice: 0,
        transactionDetailBuy: null,
        totalPrice: 0,
        subTotalPrice: 0,
        taxPrice: 0,
        showConfirm: false,
        returnConfirm: false,

        orderBuyEdit: Modal.getters('orderBuyEdit')

      }
    },

    mounted(){

    },

    watch: {
      orderBuyEdit(val){
        if(!val)
          Modal.dispatch('orderBuyEdit', {option: 'hide'})
      }
    },

    methods: {
      close(){
        Modal.dispatch('orderBuyEdit', {option: 'hide'})
      },

     async report(item){
        // var loader = this.$loading.show()
        var res = await HTTP.get('/report/detail/buy' , {
          params: {
            transactionDetailId: item.id
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
     }

    },


    computed: {
      transactionDetails(){
        return this.transactionData.transactionDetailBuys.map((obj) => ({
          ...obj,
          vehicle: obj.vehiclePurchase,
          vehicleRepair: obj.vehiclePurchase.vehicleRepair
        })).filter(obj => {
          delete obj.vehiclePurchase
          return obj
        })
      },
      customer(){
        return this.transactionData.customer
      },
      employee(){
        return this.transactionData.employee
      },

    }

}

</script>