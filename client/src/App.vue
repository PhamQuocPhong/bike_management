<template>
  <v-app>
    <progress-bar></progress-bar>
    <!-- <vue-progress-bar></vue-progress-bar> -->
    <router-view></router-view>
  </v-app>
</template>

<style lang="scss">
@import "@/styles/index";
</style>

<script>
import CookieService from '@/services/cookie'
import ProgressBar from "./components/custom/HeaderProgress.vue";


export default {
  components: {
    "progress-bar": ProgressBar
  },

  created(){

    var userInfo = CookieService.get('dataUser')
    if(userInfo){
      this.$socket.emit(this.$socketEvent.ADD_USER, userInfo);
    }
  },

  data() {
    return {
      userInfo: this.$cookies.get("dataUser")
    };
  },

};
</script>
