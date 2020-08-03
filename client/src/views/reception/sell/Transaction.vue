<template>
  <v-layout row justify-center>
    <v-dialog v-model="receptionSellTransaction" persistent max-width="1000">
      <v-card>
          <v-card-title class="headline d-flex pb-4"> Customer Transaction </v-card-title>
          <v-card-text class="mt-4">
                <v-container>
                      <v-row >

                      <v-col cols="6">
                            <p>Hình thức thanh toán</p>
                        </v-col>

                        <v-col cols="6">
                          <div class="d-flex">
                            <label>Customer name:</label>
                            <p class="pl-4 font-weight-bold">{{customerInfo.name}}</p>
                          </div>

                          <div class="d-flex">
                            <label>Customer phone:</label>
                             <p class="pl-4 font-weight-bold">{{customerInfo.phoneNumber}} </p>
                          </div>
                        </v-col>
                      </v-row>

           
                        <v-subheader>Subheader</v-subheader>

                        <v-data-table
                          :headers="headers"
                          :items="transactionDetailBuy"
                          :page.sync="page"
                          :items-per-page="itemsPerPage"
                          hide-default-footer
                          class="elevation-1"
                          @page-count="pageCount = $event"
                        >


                            <template v-slot:item.no="{ item }">
                              {{$helper.indexColumn(item, transactionDetailBuy)}}
                            </template>

                            <template v-slot:item.action="{ item }">
                              <v-btn color="white" small class="primary mr-4" @click="edit()">View</v-btn>
                              <v-btn color="white" small class="warning">Cancel</v-btn>
                            </template>

                            <template v-slot:item.registrationPlate="{ item }">
                              {{item.registrationPlate}}
                            </template>

                            <template v-slot:item.bikeStatus="{ item }">
                              
                                <v-chip :color="$helper.colorStatusBike(item.bikeStatus)"  
                                class="justify-center status-bike" 
                                small 
                                dark 
                                v-if="item.bikeStatus
                                "> 
                                  {{item.bikeStatus}} 
                                </v-chip>

                                <v-chip :color="$helper.colorStatusBike(item.bikeStatus)"  
                                class="justify-center status-bike" 
                                small  
                                dark 
                                v-else
                                >
                                  Waiting 
                                </v-chip>

                            </template>

                            <template v-slot:item.averagePrice="{ item }">
                              {{item.averagePrice | toCurrency}}
                            </template>

                            <template v-slot:item.reducePrice="{ item }">
                              <v-text-field
                                @input="calcPrice($event, item.id)"

                                value=""
                              ></v-text-field>
                            </template>

                            <template v-slot:item.price="{ item }">
                              {{item.totalPrice | toCurrency}}
                            </template>
                        </v-data-table>

                        <v-card>
                          <div class="col col-12">
                            <p 
                              class="sub-title text-right font-weight-bold"
                            > Sub total: 
                              <span class="orange--text"> {{subTotalPrice | toCurrency}}  
                              </span>
                            </p>
                            <p class="sub-titl text-right font-weight-bold"> Tax price: 
                              <span class="orange--text"> {{taxPrice | toCurrency}}  </span>
                            </p>
                            <p class="title text-right font-weight-bold"> Total price: 
                              <span class="orange--text"> {{totalPrice | toCurrency}}  </span>
                            </p>
                          </div>
                        </v-card>
                </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text outlined @click.native="payment()">Payment</v-btn>
            <v-btn color="blue darken-1" text  outlined @click.native="close">Cancel</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
     <confirm-dialog 
      :returnConfirm.sync="returnConfirm" 
      :showConfirm.sync="showConfirm"
      title="Confirm Payment"
      content="🔥 Will this payment be made as soon as you agree? Are you sure?"
     >
     </confirm-dialog>
  </v-layout>
</template>

<script>
// store
import ReceptionCustomerSell from '@/store/models/reception_customer_sell'
import VehicleTest from '@/store/models/vehicle_test'
import Transaction from '@/store/models/transaction'
import TransactionDetailBuy from '@/store/models/transaction_detail_buy'
import Modal from '@/store/models/modal'



export default {

    props: ['dialogTransaction', 'getReceptionCustomerSell'],

    data(){
      return {
        right: 10,
        top: 10,
        valid: true,
        lazy: false,
        headers: [
            { text: 'No.', value: 'no', width: 70 },
            { text: 'Name', value: 'name', width: 150 },
            { text: 'Image', value: 'iamge', width: 80 },
            { text: 'Registration plate', value: 'registrationPlate', width: 150 },
            { text: 'Bike status', value: 'bikeStatus', width: 120 },
            { text: 'Average price', value: 'averagePrice', width: 100 },
            { text: 'Reduce price', value: 'reducePrice', width: 100 },
            { text: 'Price', value: 'price', width: 100 },

        ],

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
        vehicleTests: this.getReceptionCustomerSell.vehicleTests,
      }
    },

    created(){
      var emptyObj = {}


      var data = this.vehicleTests.map((obj) => ({
          ...obj, averagePrice: Math.ceil((this.$helper.defaultNumber(obj.minPrice) +  this.$helper.defaultNumber(obj.maxPrice)) / 2),
          reducePrice: 0,
          totalPrice:  Math.ceil((this.$helper.defaultNumber(obj.minPrice) +  this.$helper.defaultNumber(obj.maxPrice)) / 2),
        }))
          .filter((obj) => {
            delete obj.minPrice
            delete obj.maxPrice
          return obj      
        })

      this.transactionDetailBuy = data
    },

    mounted(){

      this.calcSubTotalPrice()
      this.calcTaxPrice()
      this.calcTotalPrice()
    },

    watch:{
      returnConfirm(val){
        if(val === true){
          this.savePayment()
        }
      }
    }, 

    methods: {
      close() {
        Modal.dispatch('receptionSellTransaction', {option: 'hide'})
      },

      async savePayment(){

         var dataTransaction = {
            subTotal: this.subTotalPrice,
            taxPrice: this.taxPrice,
            subTotalPrice: this.subTotalPrice,
            totalPrice: this.totalPrice,
            date: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            mode: 'buy',
            employeeId: this.employeeInfo.id,
            customerId: this.customerInfo.id
          }
          var data = {
            transaction: dataTransaction,
            transactionDetailData: this.transactionDetailBuy
          }
          var res = await Transaction.api().create(data) 
          if(res.response.status === 200){
            ReceptionCustomerSell.update({
              where: res.response.data.data.id,
              data:  res.response.data.data
            })

            toastr.success(res.response.data.message, 'Success!', {timeOut: 1000})

            Modal.dispatch('receptionSellEdit', {option: 'hide'})
            Modal.dispatch('receptionSellTransaction', {option: 'hide'})
          }
      },

      async payment(){
        this.showConfirm = true
        this.returnConfirm = false
      },

      calcPrice(val, id){
        this.transactionDetailBuy.filter(obj => obj.id === id)
                                .map(obj => (obj.reducePrice = this.$helper.defaultNumber(val), 
                                    obj.totalPrice = obj.averagePrice - this.$helper.defaultNumber(val)
                                ));
        this.calcSubTotalPrice()
        this.calcTaxPrice()
        this.calcTotalPrice()
      },

      calcTotalPrice(){
        this.totalPrice = parseFloat(this.subTotalPrice) + parseFloat(this.taxPrice)
      },

      calcSubTotalPrice(){
        var calcSubTotalPrice = this.transactionDetailBuy.reduce((acc, obj) => {
          return acc +  Math.ceil(this.$helper.defaultNumber(obj.totalPrice))
        }, 0)

        this.subTotalPrice = calcSubTotalPrice
      },
      calcTaxPrice(){
        this.taxPrice = (this.subTotalPrice * 10 / 100)
      },

    },


    computed: {

      customerInfo(){
        return this.getReceptionCustomerSell.customer
      },

      employeeInfo(){
        return this.$cookies.get('dataUser').employee
      },

      receptionSellTransaction(){
        return Modal.getters('receptionSellTransaction')
      }

    }



  }

</script>