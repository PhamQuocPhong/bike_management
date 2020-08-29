import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import VuexORMAxios from "@vuex-orm/plugin-axios";
import database from "./database/index";
import axios from "axios";
import CookieService from '@/services/cookie';

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



global.axiosInstance = require('axios')
// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async config => {
    config.headers = { 
      'Authorization': 'Bearer ' + CookieService.get('accessToken'),
      'Accept': 'application/json',
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

// Response interceptors for API
axiosInstance.interceptors.response.use((response) => {

  return response
},
(error) => {
   const originalRequest = error.config;
   if (error.response.status === 401 && !originalRequest._retry) {

       originalRequest._retry = true;
       return axiosInstance.post('/auth/token/refresh_token',
           {
               "refreshToken": CookieService.get('refreshToken')
           })
           .then(res => {
               if (res.status === 200) {
                   CookieService.set('accessToken', res.data.accessToken)

                   axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + CookieService.get('accessToken')

                   return axiosInstance(originalRequest);
               }
           })
   }

   return Promise.reject(error);
});


VuexORM.use(VuexORMAxios, {
  axios,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: process.env.VUE_APP_ROOT_API || "http://localhost:3000/api"
});

export default store;
