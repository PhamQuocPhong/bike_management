import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import Loading from 'vue-loading-overlay';
import colors from 'vuetify/lib/util/colors'
import 'font-awesome/css/font-awesome.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.use(Vuetify);



export default new Vuetify({
	icons: {
    	iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
  	},
  	theme: {
	    themes: {
	      light: {
	        primary: colors.blue.darken4, // #E53935
	        secondary: colors.red.lighten4, // #FFCDD2
	        accent: colors.indigo.base, // #3F51B5
	      },
	    },
  	},


});
