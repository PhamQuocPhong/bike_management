<template>
  <v-layout row justify-center>
    <v-dialog v-model="orderSellEdit" persistent max-width="1200">
      <v-card>
          <v-card-title class="headline d-flex pb-4"> Sell Transaction </v-card-title>
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
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Vehicle name</th>
                        <th>Color </th>
                        <th>Quantity</th>
                        <th>Buy price</th>
                        <th>Fix price</th>
                        <th>Sell price</th>
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
                      <td>{{item.quantity}}</td>
                      <td>{{item.vehicle.buyPrice}}</td>
                      <td>{{item.vehicle.fixPrice}}</td>
                      <td>{{item.totalPrice | toCurrency}}</td>

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
            <v-btn color="blue darken-1" text @click.native="close">close</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Customer from '@/store/models/customer'
import Transaction from '@/store/models/transaction'
import TransactionDetailSell from '@/store/models/transaction_detail_sell'
import Modal from '@/store/models/modal'

import HTTP from '@/services/http'
import { mapMutations } from 'vuex'
export default {

    props: [ 'transactionData'],

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
        totalPrice: 0,
        subTotalPrice: 0,
        taxPrice: 0,
        showConfirm: false,
        returnConfirm: false,
      }
    },

    mounted(){

    },


    methods: {
      close() {
        Modal.dispatch('orderSellEdit', {option: 'show'})
       },

     async report(item){
              var loader = this.$loading.show()
        var res = await HTTP.get('/report/detail/sell' , {
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
        return this.transactionData.transactionDetailSells
      },
      customer(){
        return this.transactionData.customer
      },
      employee(){
        return this.transactionData.employee
      },
      orderSellEdit(){
        return Modal.getters('orderSellEdit')
      }


    }
}

</script>