  
import { Model } from '@vuex-orm/core'
import TransactionDetailBuy from './transaction_detail_buy'
import TransactionDetailSell from './transaction_detail_sell'

import Employee from './employee'
import Customer from './customer'
export default class Transaction extends Model {
  static entity = 'transaction'

  static fields () {
    return {
      id: this.attr(null),
      mode: this.attr(null),
      date: this.attr(null),
      subTotalPrice: this.attr(null),
      taxPrice: this.attr(null),
      totalPrice: this.attr(null),
      employeeId: this.attr(null),
      customerId: this.attr(null),
      employee: this.belongsTo(Employee, 'employeeId'),
      customer: this.belongsTo(Customer, 'customerId'),
      transactionDetailBuys: this.hasMany(TransactionDetailBuy, 'transactionId'),
      transactionDetailSells: this.hasMany(TransactionDetailSell, 'transactionId')
    }
  }

  static apiConfig = {
    actions: {
      async create(payload){
        try {
          return await this.post('/transaction/create', payload, {
            headers: {'x-access-token': $cookies.get('accessToken')},
            save: false
          })
        } catch(e) {
          return e.response
        }
      },
      async fetchSellPaging(page, itemPerPage = null, startDate = null, endDate = null, month = null){
        try {    
          return await this.get('/transaction/sell/page/' +  page, {
            headers: {'x-access-token': $cookies.get('accessToken')},
            params: {
              itemPerPage: itemPerPage,
              startDate: startDate,
              endDate: endDate,
              month: month
            },
            save: false
          })
        } catch(e) {
          return e.response
        }
      },


      fetchBuyPaging(page, itemPerPage = null, startDate = null, endDate = null, month = null){
        try {    
          return this.get('/transaction/buy/page/' +  page, {
            headers: {'x-access-token': $cookies.get('accessToken')},
            params: {
              itemPerPage: itemPerPage,
              startDate: startDate,
              endDate: endDate,
              month: month
            },
            save: false
          })
        } catch(e) {
          return e.response
        }
      }

    }
  }
}

