import { Model } from '@vuex-orm/core'
import Vehicle from './vehicle'
import ReceptionCustomerSell from './reception_customer_sell'
import VehicleRepair from './vehicle_repair'
import VehicleType from './vehicle_type'
export default class VehiclePurchase extends Model {
  static entity = 'vehiclePurchase'

  static fields () {
    return {
      id: this.attr(null),
      name: this.attr(null),
      color: this.attr(null),
      code: this.attr(null),
      registrationPlate: this.attr(null),
      price: this.attr(null),
      status: this.attr(null),
      image: this.attr(null),
      receptionCustomerSellId: this.attr(null),
      vehicleTypeId: this.attr(null),
      receptionCustomerSell: this.belongsTo(ReceptionCustomerSell, 'receptionCustomerSellId'),
      vehicleRepair: this.hasOne(VehicleRepair, 'vehiclePurchaseId'),
      VehicleType: this.belongsTo(VehicleType, 'vehicleTypeId'),
    }
  }

  static apiConfig = {
    actions: {
      fetchAll(){

      },

      fetchPaging(page, itemPerPage = null){
        try {    
          return this.get('/vehicle/purchase/page/' +  page,{
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


      fetchByType(vehicleTypeId){
        try {
          return this.get('/vehicle', {
            headers: {'x-access-token': $cookies.get('accessToken')},
            save: false,
            params: {
              vehicleTypeId: vehicleTypeId
            }
          })
        } catch(e) {
          return e.response
        }
      },

      update(id, payload){
        try {
          return this.post('/vehicle/purchase/update/' + id, payload, {
            headers: {'x-access-token': $cookies.get('accessToken')},
            save: false,
          })
        } catch(e) {
          return e.response
        }
      }   
    }
  }
}

