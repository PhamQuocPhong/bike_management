import Vue from 'vue';
import VueResizeText from 'vue-resize-text'
import VueProgressBar from 'vue-progressbar'
import Loading from 'vue-loading-overlay';
import colors from 'vuetify/lib/util/colors'
import 'vue-loading-overlay/dist/vue-loading.css';


Vue.use(Loading, {
	  canCancel: true, // default false
	  color: colors.cyan.accent1,
	  loader: 'spinner',
	  width: 40,
	  height: 40,
	  backgroundColor: colors.shades.black,
	  opacity: 0.5,
	  zIndex: 999,
	},{
 })




Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})


Vue.use(VueResizeText);
