import { Model } from '@vuex-orm/core'
import VehicleType from './vehicle_type'
import TechnicalTest from './technical_test'
export default class VehicleTest extends Model {
  static entity = 'vehicleTest'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(null),
      color: this.attr(null),
      registrationPlate: this.attr(null),
      bikeCode: this.attr(null),
      bikeStatus: this.attr(null),
      image: this.attr(null),
      minPrice: this.attr(null),
      maxPrice: this.attr(null),
      receptionCustomerSellId: this.attr(null),
      technicalTestId: this.attr(null),
      vehicleTypeId: this.attr(null),
      vehicleType: this.belongsTo(VehicleType, 'vehicleTypeId'),
      technicalTest: this.belongsTo(TechnicalTest, 'technicalTestId'),

      selected: this.attr(null),
    }
  }

  static apiConfig = {
    actions: {
      async update(id, data) {
        try {
          return await this.post(`/technical/vehicle-test/${id}`, data, {
            save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
          })
        } catch(error) {
          return error.response
        }
      },

      async fetchAll(id, data) {
        try {
          return await this.get('/technical/vehicle-test/', {
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

