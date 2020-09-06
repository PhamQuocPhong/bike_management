import CookieService from '@/services/cookie'

export default {
  namespaced: true,

  getters: {
    getCurrentUser: state => state.currentUser,
    getCurrentEmployee: state => state.currentUser.employee
  },

  state: {
    currentUser: CookieService.get('dataUser')
  },

  actions: {

    updateUser({ commit }, data) {
      commit("updateUser", data);
    }
  },

  mutations: {
    updateUser(state, payload) {
      state.currentUser = payload
      CookieService.set("dataUser", state.currentUser);
    }
  }
};
