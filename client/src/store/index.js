import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";
import database from "./database/index";
import axios from "axios";
import ModalModules from "./modules/modal";
import CookieService from '@/services/cookie'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {
    SOCKET_REMOVE_USER() {}
  },
  actions: {
    SOCKET_REMOVE_USER() {
      $cookies.remove("accessToken");
      $cookies.remove("dataUser");
    }
  },

  plugins: [VuexORM.install(database)]
});


axios.interceptors.response.use((response) => {
  return response
},
(error) => {
   const originalRequest = error.config;
   if (error.response.status === 401 && !originalRequest._retry) {

       originalRequest._retry = true;
       return axios.post('/auth/token/refresh_token',
           {
               "refreshToken": CookieService.get('refreshToken')
           })
           .then(res => {

               if (res.status === 200) {
                   // 1) put token to LocalStorage
                   CookieService.set('accessToken', res.data.accessToken)

                   // 2) Change Authorization header
                   axios.defaults.headers.common['Authorization'] = 'Bearer ' + CookieService.get('accessToken')
                   // 3) return originalRequest object with Axios.
                   return axios(originalRequest);
               }
           })
   }

   // return Error object with Promise
   return Promise.reject(error);
});

VuexORM.use(VuexORMAxios, {
  axios,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "x-access-token": CookieService.get('accessToken')
  },
  baseURL: process.env.VUE_APP_ROOT_API || "http://localhost:3000/api"
});

export default store;
