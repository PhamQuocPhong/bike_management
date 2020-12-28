<template>
  <div id="layout-admin">
    <toolbar-header></toolbar-header>
    <v-main>
      <div id="page-wrapper">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </v-main>
    <m-footer></m-footer>
      <menu-right></menu-right>
  </div>
</template>


<script>
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import MenuRight from "./partials/MenuRight";

export default {
  components: { 
    "toolbar-header": Header, 
    "m-footer": Footer, 
    "menu-right": MenuRight 
  },

};
</script>
