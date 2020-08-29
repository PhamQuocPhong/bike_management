import CookieService from '@/services/cookie'

export default {
  namespaced: true,

  getters: {
    accessToken: state => state.accessToken
  },

  state: {
    accessToken: CookieService.get('accessToken') || null
  },

  actions: {
    // reception
    storeAccessToken({ commit }, data) {
      commit("storeAccessToken", data);
    }
  },

  mutations: {
    storeAccessToken(state, payload) {
      CookieService.set('accessToken', payload.accessToken)
    }
  }
};
