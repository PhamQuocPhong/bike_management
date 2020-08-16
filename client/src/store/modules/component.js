export default {
  namespaced: true,      

  getters: {
    headerProgress: state => state.headerProgress
  },      		

  state: {
    headerProgress: false 
  },	

  actions: {
    // reception 
    loadingProgress({commit}, data){
      commit('loadingProgress', data)
    },
  
  },

  mutations: {
    loadingProgress(state, payload){
      var option = payload.option
      if(option === 'show'){
        state.headerProgress = true
        return
      }
      state.headerProgress = false
    },
  }
}
