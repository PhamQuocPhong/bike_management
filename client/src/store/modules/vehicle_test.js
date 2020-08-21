// import HTTP from '../../http'

export default {
  namespaced: true,

  state: {
    vehicleTestArray: []
  },

  actions: {
    add({ commit }, data) {
      commit("add", data);
    },
    remove({ commit }, index) {
      commit("remove", index);
    },
    clear({ commit }) {
      commit("clear");
    }
  },

  mutations: {
    add(state, payload) {
      var index = payload.index;
      var item = payload.item;
      if (index == null) {
        state.vehicleTestArray.push(item);
      } else {
        state.vehicleTestArray[index] = item;
      }
    },
    remove(state, index) {
      var vehicleTestArray = state.vehicleTestArray;
      vehicleTestArray.splice(index, 1);
      state.vehicleTestArray = vehicleTestArray;
    },

    clear(state) {
      state.vehicleTestArray = [];
    }
  }
};
