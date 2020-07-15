import { Model } from '@vuex-orm/core'
import Employee from './employee'
import SalesCustomerBuy from './sales_customer_buy'
export default class ReceptionCustomerBuy extends Model {
  static entity = 'receptionCustomerBuy'

  static fields () {
    return {
      id: this.attr(null),
      employeeId: this.attr(null),
      employee: this.belongsTo(Employee, 'employeeId'),
      salesCustomerBuy: this.hasOne(SalesCustomerBuy, 'receptionCustomerBuyId'),     
    }
  }

  static apiConfig = {
    actions: {
      async fetchAll(){
        try {    
          return await this.get('/reception/customer-buy', {
            headers: {'x-access-token': $cookies.get('accessToken')},
            save: false
          })
        } catch(error) {
          return error.response
        }
      },

      create(payload) {
        try {    
          return this.post('/reception/customer-buy/create', payload, {
            headers: {'x-access-token': $cookies.get('accessToken')},
            save: false
          })
        } catch(error) {
          return error.response
        }
      },

      update(id, payload){
        try {    
          return this.post('/reception/customer-buy/update/' + id, payload, {
            headers: {'x-access-token': $cookies.get('accessToken')},
            save: false
          })
        } catch(error) {
          return error.response
        }
      }
    }
  }
}