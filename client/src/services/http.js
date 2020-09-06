import Router from "../router";
import Vue from "vue";
import axios from "axios";
import CookieService from '@/services/cookie'

const axiosInstance = axios.create({
  baseURL:  process.env.VUE_APP_ROOT_API || "http://localhost:3000/api"
});


// // Request interceptor for API calls
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

    // if no login => 
    if(error.response.status === 401 && !CookieService.get('refreshToken')){
        return Promise.reject(error);
    }

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
   // return Error object with Promise
   return Promise.reject(error);
});

export default {
  create: async (url, data = null, options = {}) => {
    try {
      const res = await axiosInstance.post(url, data, options);
      if (res) {
        return res;
      }
    } catch (error) {
      return error.response;
    }
  },

  get: async (url, options = {}) => {
    try {
      const res = await axiosInstance.get(url, options);
      if (res) {
        return res;
      }
    } catch (error) {
      return error.response;
    }
  }
};
