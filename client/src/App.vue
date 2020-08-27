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
import Auth from '@/services/auth';
import ProgressBar from "./components/custom/HeaderProgress.vue";


export default {
  components: {
    "progress-bar": ProgressBar
  },

  data() {
    return {
      userInfo: this.$cookies.get("dataUser")
    };
  },

};
</script>
