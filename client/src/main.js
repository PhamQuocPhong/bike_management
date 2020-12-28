import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router.js";
import gAuth from "vue-google-oauth2";
import appData from "./config/data";
import moment from "moment";
import vueMoment from "vue-moment";
import helper from "./helpers/common";
import config from "@/config/config";
import validation from "./helpers/validation";

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import SocketEvent from '@/config/socket_event'

Vue.config.productionTip = false;


import store from "./store/index.js";


Vue.use(
  new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_ROOT_SOCKET || "http://localhost:3000",
    vuex: {
      store,
      actionPrefix: "",
      mutationPrefix: ""
    }
    // options: { path: "/my-app/" } //Optional options
  })
);



require("moment/locale/es");

// Choose Locale
moment.locale("es");
Vue.use(vueMoment, { moment });

const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: process.env.VUE_APP_GOOGLE_SCOPE,
  prompt: process.env.VUE_APP_GOOGLE_PROMPT
};

Vue.use(gAuth, gauthOption);


Vue.prototype.$helper = helper;
Vue.prototype.$validation = validation;
Vue.prototype.$appConfig = config;
Vue.prototype.$appData = appData;
Vue.prototype.$socketEvent = SocketEvent;

require("./plugins/lib");
require("./plugins/directive");
require("./plugins/filter");



new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
