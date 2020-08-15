 <template>
<div>
  <v-card class="mb-3" >
    <breadcrumbs></breadcrumbs>  
  </v-card>
  <v-card class="main-layout pa-3">
      <router-view></router-view>   
  </v-card> 
</div>
</template>

<script>
export default{

  data(){
    return {
      visit: false,
      userInfo: this.$cookies.get('dataUser')
    }
  },


  async created(){
    // var loader = this.$loading.show()

    // if(this.userInfo){
    //   setTimeout(() => {
    //     loader.hide()
    //     this.$router.replace('/chat/room/1').catch(()=>{})
    //   }, 1000)
    // }
    
  }, 

}
</script>