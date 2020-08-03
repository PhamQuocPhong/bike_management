import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import database from './database/index'
import axios from 'axios'
import ModalModules from './modules/modal'



Vue.use(Vuex)


const store = new Vuex.Store({

    state: {},
    mutations: {
        SOCKET_REMOVE_USER() {

        }
    },
    actions: {
        SOCKET_REMOVE_USER() {
            $cookies.remove('accessToken')
            $cookies.remove('dataUser')
        }
    },

	plugins: [VuexORM.install(database)]
})



VuexORM.use(VuexORMAxios, {
  axios,
  headers: { 
    'X-Requested-With': 'XMLHttpRequest',
  },
  baseURL: process.env.VUE_APP_ROOT_API || 'http://localhost:3000/api'
})

export default store



// import authModule from './auth/store.js'
// import receptionModule from './reception/store.js'
// import customerModule from './customer/store.js'

// export default new Vuex.Store({
//    modules: {
//   	storeAuth: authModule,
//   	storeReception: receptionModule,
//   	storeCustomer: customerModule,
//   },
// })

