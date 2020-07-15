  
import { Model } from '@vuex-orm/core'
import VehicleTest from './vehicle_test'
export default class TechnicalTest extends Model {
  static entity = 'technicalTest'

  static fields () {
    return {
      id: this.attr(null),
      minPrice: this.attr(null),
      maxPrice: this.attr(null),
      vehicleTests: this.hasMany(VehicleTest, 'receptionCustomerSellId')
    }
  }

  static apiConfig = {
    actions: {
      // fetchAll: {
      //   method: 'get',
      //   url: '/technical/test',
      //   dataTransformer: (response) => {
      //     return response.data
      //   }
      // },

      async fetchAll(){
        try {    
          return await this.get('/technical/test', {
              headers: {'x-access-token': $cookies.get('accessToken')},
              save: false
            })
          } catch(error) {
            return error.response
          }
      },
    }
  }
}

