 <template>
<div>
  <v-card class="mb-3" >
      <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
  </v-breadcrumbs>
  </v-card>
  <v-card class="main-layout pa-3">
      <router-view></router-view>   
  </v-card> 
</div>
</template>

<script>
export default{

  data() {
    return {
      items: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
    ],
    }
  }

}
</script>