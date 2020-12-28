import CookieService from '@/services/cookie'
import Config from '@/config/config'

export default {
  namespaced: true,

  getters: {
    getCurrentUser: state => state.currentUser,
    getAvatarCurrentUser: state => Config.URL_AVATAR_AWS + state.currentUser.avatar,
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
