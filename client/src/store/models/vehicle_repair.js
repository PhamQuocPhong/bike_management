import { Model } from '@vuex-orm/core'
import VehiclePurchase from './vehicle_purchase'
import Vehicle from './vehicle'
import TechnicalRepair from './technical_repair'
export default class VehicleRepair extends Model {
  static entity = 'vehicleRepair'

  static fields () {
    return {
      id: this.attr(null),
      note: this.attr(null),
      startDate: this.attr(null),
      endDate: this.attr(null),
      approveFlg: this.attr(null),
      fixFlg: this.attr(null),
      pushlishFlg: this.attr(null),
      price: this.attr(null),
      fixPrice: this.attr(null),
      vehiclePurchaseId: this.attr(null),
      vehiclePurchase: this.belongsTo(VehiclePurchase, 'vehiclePurchaseId'),
      technicalRepairs: this.hasMany(TechnicalRepair, 'vehicleRepairId'),
      selected: this.attr(null),
    }
  }

  static apiConfig = {
    actions: {
      fetchAll(){

      },

      fetchPaging(page, itemPerPage = null){
        try {    
          return this.get('/vehicle/repair/page/' +  page,{
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

      fetchByType(vehicleTypeId){
        try {
          return this.get('/vehicle', {
             save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
            params: {
              vehicleTypeId: vehicleTypeId
            }
          })
        } catch(e) {
          return e.response
        }
      },

      create(payload){
        try {
          return this.post('vehicle/repair/create', payload, {
             save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
          })
        } catch(e) {
          return e.response
        }
      },

      update(id, payload){
        try {
          return this.post('vehicle/repair/update/' + id , payload, {
            save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
          })
        } catch(e) {
          return e.response
        }
      },

      publish(id, payload){
        try {
          return this.post('vehicle/repair/publish/' + id , payload, {
             save: false,
            headers: {'x-access-token': $cookies.get('accessToken')},
          })
        } catch(e) {
          return e.response
        }
      }

    }
  }
}

