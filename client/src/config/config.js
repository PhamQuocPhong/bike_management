/*import Vue from "vue";*/

export default {
  BASE_URL: process.env.VUE_APP_ROOT,
  BASE_API_URL: process.env.VUE_APP_ROOT_API,

  roles: {
  	SUPER_ADMIN: 1,
  	ADMIN: 2,
  	MEMBER: 3,
  	GUEST: 4,
  }
};

// export default {
//   install(Vue) {
//     Vue.appConfig = config;
//     Vue.prototype.$appConfig = config;
//   }
// };
