<template>
<div id="layout-basic">
    <toolbar-header></toolbar-header>
    <v-content>
        <div id="page-wrapper">
          <div class="main-content">
              <router-view></router-view>
          </div>
        </div>
      </v-content>
      <m-footer></m-footer>
</div>
</template>
<script>
import Header from './partials/Header'
import Footer from './partials/Footer'

export default {
  components: {'toolbar-header':  Header, 'm-footer': Footer},

 
}

</script>
