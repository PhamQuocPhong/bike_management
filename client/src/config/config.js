/*import Vue from "vue";*/

export default {
  BASE_URL: process.env.VUE_APP_ROOT,
  BASE_API_URL: process.env.VUE_APP_ROOT_API,
  URL_AVATAR_AWS: "https://quanlymuabanxe.s3.ap-southeast-1.amazonaws.com/avatars/",

  roles: {
  	SUPER_ADMIN: 1,
  	ADMIN: 2,
  	MEMBER: 3,
  	GUEST: 4,
  },

  aspectRatio: {
  	table: 16/5
  },

  pagination: {
  	CURENT_PAGE: 1,
  	ITEMS_PER_PAGE: 7,
  	ITEMS_PER_PAGE_LIST: [5, 10, 15],
  	PAGE_COUNTS_DEFAULT: 0,
  }
};

// export default {
//   install(Vue) {
//     Vue.appConfig = config;
//     Vue.prototype.$appConfig = config;
//   }
// };
