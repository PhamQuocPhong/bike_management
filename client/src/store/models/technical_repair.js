  
import { Model } from '@vuex-orm/core'
import VehicleRepair from './vehicle_repair'
import Employee from './employee'
export default class TechnicalRepair extends Model {
  static entity = 'technicalRepair'

  static fields () {
    return {
      id: this.attr(null),
      accessory: this.attr(null),
      startDate: this.attr(null),
      endDate: this.attr(null),
      finishFlg: this.attr(null),
      price: this.attr(null),
      employeeId: this.attr(null),
      vehicleRepairId: this.attr(null),
      employee: this.belongsTo(Employee, 'employeeId'),
      vehicleRepair: this.belongsTo(VehicleRepair, 'vehicleRepairId')
    }
  }

  static apiConfig = {
    actions: {

      async create(payload){
        try {    
          return await this.post('/technical/repair/create', payload, {
            save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
          })

        } catch(error) {
          return error.response
        }
      },

      async update(id, payload){
        try {    
          return await this.post('/technical/repair/update/' + id, payload, {
            save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
          })
        } catch(error) {
          return error.response
        }
      },

      async fetchPaging(page, itemPerPage = null){
        try {    
          return await this.get('/technical/repair/page/' +  page, {
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

      async fetchByVehicleRepairId(vehicleRepairId){
        try {    
          return await  this.get('/technical/vehicle-repair/' + vehicleRepairId, {
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

