import Vue from "vue";
import VueResizeText from "vue-resize-text";
import VueProgressBar from "vue-progressbar";
import Loading from "vue-loading-overlay";
import colors from "vuetify/lib/util/colors";
import "vue-loading-overlay/dist/vue-loading.css";
import VueChatScroll from "vue-chat-scroll";

// component
import ConfirmDialog from "@/components/custom/dialog/Confirm.vue";
import PinDialog from "@/components/custom/dialog/Pin.vue";
import BreadCrumbs from "@/components/custom/BreadCrumbs";
import LabelTable from "@/components/custom/LabelTable";

import Button from '@/components/custom/button/Button';


Vue.component("confirm-dialog", ConfirmDialog);
Vue.component("breadcrumbs", BreadCrumbs);
Vue.component("label-table", LabelTable);
Vue.component("pin-dialog", PinDialog);

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
