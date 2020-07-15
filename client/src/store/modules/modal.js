export default {
  namespaced: true,      

  getters: {
    receptionBuyEdit: state => state.reception.buy.edit,
    receptionSellEdit: state => state.reception.sell.edit,
    receptionSellAddVehicle: state => state.reception.sell.addVehicle,
    receptionSellTransaction: state => state.reception.sell.transaction,
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
        trasaction: false,
      },
  },	

  actions: {

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
  },

  mutations: {
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




    // showReceptionSellAddVehicle(state){
    //   state.reception.sell.addVehicle = true
    // },
    // hideReceptionSellAddVehicle(state) {
    //   state.reception.sell.addVehicle = false
    // },

    // showReceptionSellTransaction(state){
    //   state.reception.sell.transaction = true
    // },
    // hideReceptionSellTransaction(state) {
    //   state.reception.sell.transaction = false
    // },


  }
}
