  
import { Model } from '@vuex-orm/core'
import Employee from './employee'
import SalesCustomerBuy from './sales_customer_buy'
export default class Sales extends Model {
  static entity = 'sales'

  static fields () {
    return {
      id: this.attr(null),
      totalPrice: this.attr(null),
      employeeId: this.attr(null),
      employee: this.belongsTo(Employee, 'employeeId'),
      salesCustomerBuy: this.hasOne(SalesCustomerBuy, 'saleId'),     
    }
  }

  static apiConfig = {
    actions: {
      async fetchAll(){
        try {    
          return await this.get('/sales/', {
            headers: {'x-access-token': $cookies.get('accessToken')},
            save: false
          })
        } catch(error) {
          return error.response
        }
      },


      async fetchPaging(page, itemPerPage = null){
        try {    
          return await this.get('/sales/page/' +  page, {
            headers: {'x-access-token': $cookies.get('accessToken')},
            params: {
              itemPerPage: itemPerPage
            },
            save: false
          })
        } catch(error) {
          return error.response
        }
      },

      async suggestVehicles(payload){
        try {    
          return await this.post('/sales/suggest-vehicles', payload, {
            headers: {'x-access-token': $cookies.get('accessToken')},
            save: false
          })
        } catch(error) {
          return error.response
        }
      },

      async contactCustomer(id, payload){
        try {    
          return await this.post('/sales/contact-customer/' + id, payload, {
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

