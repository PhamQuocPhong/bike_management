import { Model } from '@vuex-orm/core'

export default class VehicleType extends Model {
  static entity = 'vehicleType'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(null),
    }
  }

  static apiConfig = {
    actions: {
      async fetchAll(){
        try {
          return await this.get(`/vehicle-type/`, {
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