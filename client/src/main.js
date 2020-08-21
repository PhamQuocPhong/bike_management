import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router.js";
// import lib from "./plugins/lib";
// import directive from "./plugins/directive";
// import filter from "./plugins/filter";
import gAuth from "vue-google-oauth2";
import enumData from "./helpers/enum_data";
import moment from "moment";
import vueMoment from "vue-moment";
import helper from "./helpers/common";
import configPlugin from "@/config/config";
import validation from "./helpers/validation";
import store from "./store/index.js";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import VueCookies from "vue-cookies";

require("./plugins/lib");
require("./plugins/directive");
require("./plugins/filter");

Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.$cookies.config(60 * 60, "");

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

// component
import ConfirmDialog from "@/components/custom/dialog/Confirm.vue";
import PinDialog from "@/components/custom/dialog/Pin.vue";
import BreadCrumbs from "@/components/custom/BreadCrumbs";
import LabelTable from "@/components/custom/LabelTable";

Vue.component("confirm-dialog", ConfirmDialog);
Vue.component("breadcrumbs", BreadCrumbs);
Vue.component("label-table", LabelTable);
Vue.component("pin-dialog", PinDialog);

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
Vue.use(configPlugin);

Vue.prototype.$enum = enumData;
Vue.prototype.$helper = helper;
Vue.prototype.$validation = validation;

global.axios = require("axios");
global.axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest"
};

global.axios.defaults.baseURL =
  process.env.VUE_APP_ROOT_API || "http://localhost:3000/api/";
global.toastr = require("toastr");
global.toastr.options.closeButton = true;
global.toastr.options.closeMethod = "fadeOut";
global.toastr.options.closeDuration = 500;
global.toastr.options.closeEasing = "swing";

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
