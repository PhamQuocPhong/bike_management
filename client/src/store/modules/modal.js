export default {
  namespaced: true,      

  getters: {
    receptionBuyEdit: state => state.reception.buy.edit,
    receptionSellEdit: state => state.reception.sell.edit,
    receptionSellAddVehicle: state => state.reception.sell.addVehicle,
    receptionSellTransaction: state => state.reception.sell.transaction,

    salesEdit: state => state.sales.edit,
    salesTransaction: state => sales.sales.transaction,

    technicalRepairEdit: state => state.technical.repair.edit,
    technicalTestEdit: state => state.technical.test.edit,

    orderSellEdit: state =>  state.order.sell.edit,
    orderBuyEdit: state =>  state.order.sell.edit,

    manageVehicleRepairEdit: state =>  state.manage.vehicle.repair.edit,
    manageVehicleRepairAddFixDetail: state => state.manage.vehicle.repair.addFixDetail,
    manageVehiclePurchaseEdit: state =>  state.manage.vehicle.purchase.edit,

    warehouseCreate: state =>  state.warehouse.create,
    warehouseEdit: state =>  state.warehouse.edit,
  },      		

  state: {
      reception: {
        buy: {
          edit: false
        },

        sell: {
          edit: false,
          addVehicle: false,
          transaction: false
        }
      },

      sales: {
        edit: false,
        transaction: false,
      },

      order: {
        buy: {
          edit: false
        },
        sell: {
          edit: false
        }
      },

      technical: {
        repair: {
          edit: false
        },

        test: {
          edit: false
        }
      },

      manage: {
        vehicle: {
          purchase: {
            edit: false
          },

          repair: {
            edit: false,
            addFixDetail: false
          }
        }
      },

      warehouse: {
        create: false,
        edit: false
      }
  },	

  actions: {
    // reception 
    receptionBuyEdit({commit}, data){
      commit('receptionBuyEdit', data)
    },

    receptionSellEdit({commit}, data){
      commit('receptionSellEdit', data)
    },

    receptionSellTransaction({commit}, data){
      commit('receptionSellTransaction', data)
    },

    receptionSellAddVehicle({commit}, data){
      commit('receptionSellAddVehicle', data)
    },


    // sales
    salesEdit({commit}, data){
      commit('salesEdit', data)
    },

    salesTransaction({commit}, data){
      commit('salesTransaction', data)
    },

    // technical
    technicalRepairEdit({commit}, data){
      commit('technicalRepairEdit', data)
    },

    technicalTestEdit({commit}, data){
      commit('technicalTestEdit', data)
    },

    // order
    orderSellEdit({commit}, data){
      commit('orderSellEdit', data)
    },

    orderBuyEdit({commit}, data){
      commit('orderBuyEdit', data)
    },

    //manage
    manageVehicleRepairEdit({commit}, data){
      commit('manageVehicleRepairEdit', data)
    },

    manageVehicleRepairAddFixDetail({commit}, data){
      commit('manageVehicleRepairAddFixDetail', data)
    },

    manageVehiclePurchaseEdit({commit}, data){
      commit('manageVehiclePurchaseEdit', data)
    },

    // warehouse 
    warehouseCreate({commit}, data){
      commit('warehouseCreate', data)
    },

    warehouseEdit({commit}, data){
      commit('warehouseEdit', data)
    },

  },

  mutations: {
    // reception 
    receptionBuyEdit(state, payload){
      var option = payload.option
      var recception = state.reception
      if(option === 'show'){
        recception.buy.edit = true
        return
      }
      recception.buy.edit = false
    },

    receptionSellEdit(state, payload){
      var option = payload.option
      var recception = state.reception
      if(option === 'show'){
        recception.sell.edit = true
        return
      }
      recception.sell.edit = false
    },

    receptionSellTransaction(state, payload){
      var option = payload.option
      var recception = state.reception
      if(option === 'show'){
        recception.sell.transaction = true
        return
      }
      recception.sell.transaction = false
    },

    receptionSellAddVehicle(state, payload){
      var option = payload.option

      if(option === 'show'){
        state.reception.sell.addVehicle = true
        return
      }
      state.reception.sell.addVehicle = false
    },

    // sales
    salesEdit(state, payload){
      var option = payload.option

      if(option === 'show'){
        state.sales.edit = true
        return
      }
      state.sales.edit = false
    },

    salesTransaction(state, payload){
      var option = payload.option

      if(option === 'show'){
        state.sales.transaction = true
        return
      }
      state.sales.transaction = false
    },

    // technical
    technicalRepairEdit(state, payload){
      var option = payload.option

      if(option === 'show'){
        state.technical.repair.edit = true
        return
      }
      state.technical.repair.edit = false
    },

    technicalTestEdit(state, payload){
      var option = payload.option

      if(option === 'show'){
        state.technical.test.edit = true
        return
      }
      state.technical.test.edit = false
    },

    // order
     orderSellEdit(state, payload){
      var option = payload.option

      if(option === 'show'){
        state.order.sell.edit = true
        return
      }
      state.order.sell.edit = false
    },

    orderBuyEdit(state, payload){
      var option = payload.option

      if(option === 'show'){
        state.order.buy.edit = true
        return
      }
      state.order.buy.edit = false
    },


    // manage
    manageVehicleRepairEdit(state, payload){
      var option = payload.option
      if(option === 'show'){
        state.manage.vehicle.repair.edit = true
        return
      }
      state.manage.vehicle.repair.edit = false
    },

    manageVehicleRepairAddFixDetail(state, payload){
      var option = payload.option
      if(option === 'show'){
        state.manage.vehicle.repair.addFixDetail = true
        return
      }
      state.manage.vehicle.repair.addFixDetail = false
    },

    manageVehiclePurchaseEdit(state, payload){
      var option = payload.option

      if(option === 'show'){
        state.manage.vehicle.purchase.edit = true
        return
      }
      state.manage.vehicle.purchase.edit = false
    },

    // warehouse
    warehouseCreate(){
      var option = payload.option

      if(option === 'show'){
        state.warehouse.create = true
        return
      }
      state.warehouse.create = false
    },

    warehouseEdit(){
      var option = payload.option

      if(option === 'show'){
        state.warehouse.edit = true
        return
      }
      state.warehouse.edit = false
    }
  }
}
