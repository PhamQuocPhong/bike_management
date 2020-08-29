import Vue from "vue";
import VueResizeText from "vue-resize-text";
import VueProgressBar from "vue-progressbar";
import Loading from "vue-loading-overlay";
import colors from "vuetify/lib/util/colors";
import VueChatScroll from "vue-chat-scroll";
import VueCropper from 'vue-cropperjs';

import "vue-loading-overlay/dist/vue-loading.css";
import 'cropperjs/dist/cropper.css';


global.axios = require("axios");
global.axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest"
};


global.axios.defaults.baseURL = process.env.VUE_APP_ROOT_API || "http://localhost:3000/api/";


// toastr 
global.toastr = require("toastr");
global.toastr.options.closeButton = true;
global.toastr.options.closeMethod = "fadeOut";
global.toastr.options.closeDuration = 500;
global.toastr.options.closeEasing = "swing";


// component
import ConfirmDialog from "@/components/custom/dialog/Confirm.vue";
import PinDialog from "@/components/custom/dialog/Pin.vue";
import BreadCrumbs from "@/components/custom/BreadCrumbs";
import LabelTable from "@/components/custom/LabelTable";
import Sekeleton from '@/components/custom/Sekeleton';
import Button from '@/components/custom/button/Button';

Vue.component(VueCropper);
Vue.component("confirm-dialog", ConfirmDialog);
Vue.component("breadcrumbs", BreadCrumbs);
Vue.component("label-table", LabelTable);
Vue.component("pin-dialog", PinDialog);
Vue.component("skeleton-custom", Sekeleton);
Vue.component("btn-custom", Button);


Vue.use(VueChatScroll);

Vue.use(
  Loading,
  {
    canCancel: true, // default false
    color: colors.cyan.accent1,
    loader: "spinner",
    width: 40,
    height: 40,
    backgroundColor: colors.shades.black,
    opacity: 0.5,
    zIndex: 999
  },
  {}
);

Vue.use(VueProgressBar, {
  color: "rgb(143, 255, 199)",
  failedColor: "red",
  height: "5px"
});

Vue.use(VueResizeText);
