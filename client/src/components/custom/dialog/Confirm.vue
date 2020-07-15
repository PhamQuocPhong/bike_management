<template>
  <v-container>
    <v-dialog  class="confirm" v-model="showConfirm" persistent max-width="300">
      <v-card>
          <v-card-title class="d-flex  justify-center"> {{title}}</v-card-title>
          <v-card-text  class="text-center">
              {{content}}
          </v-card-text>
          <v-card-actions class="btn-grid justify-space-between">
              <v-btn class="btn btn-left" color="blue darken-1" text @click.native="confirm()">Yes</v-btn>
              <v-btn class="btn btn-right" color="blue darken-1" text @click.native="cancel()">No</v-btn>
            </div>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>


export default {

  props: {
    title: String,
    content: String,
    confirmText: {
      type: String,
      default: "Ok"
    },
    showConfirm: Boolean,
    returnConfirm: Boolean
  },

  mounted(){
 
  },

  methods: {
    cancel(){
      this.$emit('update:showConfirm', false)
    },
    confirm(){
      this.$emit('update:showConfirm', false)
      this.$emit('update:returnConfirm', true)
    }
  }


};

</script>

<style scoped>
.confirm{
  position: absolute;
  top: 50px;
  border-radius: 20px;
}

.btn-grid{
    padding: 0;
    border-top: 1px ridge #1E88E5;
    height: 50px;
}

.btn-grid .btn{
  height: 100% !important;
  padding: 0 !important;
  width: 50%;
  margin: 0 !important;
  border-radius: unset;
}

.btn-left{
   border-right: 1px solid;
}
</style>