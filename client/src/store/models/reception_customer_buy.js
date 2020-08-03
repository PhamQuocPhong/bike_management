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
            
            save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
          })
        } catch(error) {
          return error.response
        }
      },

      async fetchPaging(page, itemPerPage = null){
        try {    
          return await this.get('/reception/customer-buy/page/' +  page, {
            
            params: {
              itemPerPage: itemPerPage
            },
            save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
          })
        } catch(error) {
          return error.response
        }
      },
      create(payload) {
        try {    
          return this.post('/reception/customer-buy/create', payload, {
            save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
          })
        } catch(error) {
          return error.response
        }
      },

      update(id, payload){
        try {    
          return this.post('/reception/customer-buy/update/' + id, payload, {
            save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
          })
        } catch(error) {
          return error.response
        }
      }
    }
  }
}