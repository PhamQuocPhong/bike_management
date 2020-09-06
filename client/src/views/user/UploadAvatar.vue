<template>

<v-layout row justify-center>
  <v-container>
    <v-dialog
      persistent
      max-width="500"
      v-model="isVisible"
    >
      <v-card
        class="pb-8"
      >
        <div class="d-flex border-bottom" >
          <v-card-title primary-title style="width:100%;">
            Upload avatar
          </v-card-title>
           <v-card-actions>

              <v-spacer></v-spacer>
                <btn-custom 
                :outlined="true"
                title="Save"
                v-on:action="save()"
                color="blue darken-1"
                type="save"
              >
              </btn-custom>
              
              <btn-custom 
                :outlined="true"
                title="Cancel"
                v-on:action="close()"
                color="blue darken-1"
                type="close"
              >
              </btn-custom>
            </v-card-actions>
        </div>

        <div class="content justify-center mt-8">

          <section class="cropper-area">
             <div class="img-cropper">
              <vue-cropper
                ref="cropper"
                :src="imgSrc"
                alt="Source Image"
                preview=".preview"
                :aspect-ratio="3 / 4"
              >
              </vue-cropper>
            </div>
          </section>
  
        </div>
      </v-card>
  </v-dialog>
  </v-container>
</v-layout>

</template>
<style scoped="">

.content {
  display: flex;
  justify-content: space-between;
}
.cropper-area {
  width: 350px;
}


</style>

<script>
import DropZone from "@/components/custom/DropZone.vue";
import Modal from "@/store/models/modal";
import User from "@/store/models/user";

export default {

  components: {
    'dropzone': DropZone
  },
    
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },

    image: {
      type: Object
    },

    oldImageUrl: {
      type: String
    }

  },


  data() {
    return {
      imgSrc: null,
      cropImg: null,
      data: {
        left: 92,
        top: 36.9375,
        width: 250,
        height: 350,
      },
      userInfo: this.$cookies.get('dataUser'),
    };
  },

  mounted(){
    this.setImage();
    this.setCropBoxData();
  },


  methods: {
    close(){
     this.$emit('update:isVisible', false) 
    },

    async save(){
      var loader = this.$loading.show();
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      var data = {
        avatar: this.cropImg,
        oldAvatarUrl: this.oldImageUrl
      }

      const res = await User.api().uploadAvatar(this.userInfo.id, data)

      if(res.response.status === 200){
        //
        this.userInfo.avatar = res.response.data.newAvatar

        User.dispatch('updateUser', this.userInfo)
        this.$emit('update:isVisible', false)
        loader.hide() 
      }
    },

    setCropBoxData() {

      this.$refs.cropper.setCropBoxData(this.data);
    },

    setImage() {

      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imgSrc = fileReader.result
        this.$refs.cropper.replace(fileReader.result);
      })

      fileReader.readAsDataURL(this.image.data);

    },
  },


};
</script>
