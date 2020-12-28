<template>
  <div id="profile">
    <v-layout v-resize="onResize">
      <v-container>
        <v-row>
          <label-table title="Profile"> </label-table>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
            <v-card tile>
              <v-img
                height="100%"
                src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
              >
                <v-row align="end" class="fill-height">
                  <v-col align-self="start" class="pt-0" cols="12">
                    <v-avatar class="profile" color="white" tile  width="200" height="250">
                      <v-img
                        :src="avatar"
                      ></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col class="py-0">
                    <v-list-item color="rgba(0, 0, 0, .4)" dark>
                      <v-list-item-content>
                        <v-list-item-title class="title"
                          >Marcus Obrien</v-list-item-title
                        >
                        <v-list-item-subtitle
                          >Network Engineer</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-img>
              <v-card-actions class="justify-center border-bottom pa-4">
                  <input
                    type="file"
                    ref="inputAvatar"
                    accept="image/*"
                    @change="onFilePicked"
                    v-show="false"

                  />
                <v-btn 
                  color="primary" 
                  small 
                  v-on:click="onSelectedFile()"
                  depressed
                  :loading="isSelecting"
                >
                  <v-icon left>
                    cloud_upload
                  </v-icon>

                  Upload avatar

                </v-btn>
              </v-card-actions>

              <v-list flat class="pa-0">
                <v-list-item-group color="primary">
                  <template v-for="(item, index) in items">
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.text"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider
                      v-if="index + 1 < items.length"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12" md="8" :class="{ 'pa-0': isMobile }">
            <v-card tile>
              <v-form ref="form">
                <v-container>
                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Full name</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        :disabled="!edit"
                        class="font-weight-bold"
                        v-model="employeeInfo.fullName"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Email personal</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        :disabled="!edit"
                        class="font-weight-bold"
                        v-model="userInfo.email"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Phone number</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        :disabled="!edit"
                        class="font-weight-bold"
                        v-model="employeeInfo.phoneNumber"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Address</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        v-model="employeeInfo.address"
                        :disabled="!edit"
                        class="font-weight-bold"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="4">
                      <v-subheader class="font-weight-bold"
                        >Position</v-subheader
                      >
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        readonly
                        :disabled="!edit"
                        class="font-weight-bold"
                        v-model="employeeInfo.position.name"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-spacer></v-spacer>

                    <v-btn @click="edit = true" color="success" small>
                      Edit
                    </v-btn>

                    <v-divider class="mx-2" vertical> </v-divider>

                    <v-btn color="primary" small
                      v-on:click="handleUpdateUserInfo()"
                    >
                      Save
                    </v-btn>

                    <v-divider class="mx-2" vertical> </v-divider>

                    <v-btn
                      @click="edit = false"
                      color="warning"
                      class="mr-4"
                      small
                    >
                      Cancel
                    </v-btn>
                  </v-row>
                </v-container>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <upload-avatar
      :isVisible.sync="showAvatarDialog"
      :image="image"
      :oldImageUrl="userInfo.avatar"
      v-if="showAvatarDialog"
      ></upload-avatar>
    </v-layout>
  </div>
</template>

<script>
// store
import User from '@/store/models/user'
import UploadAvatar from "./UploadAvatar.vue";


export default {

  components: {
    'upload-avatar': UploadAvatar,
  },

  data() {
    return {
      items: [
        { text: "Profile", icon: "mdi-clock" },
        { text: "Notify", icon: "mdi-account" }
      ],
      edit: false,
      isMobile: false,
      showAvatarDialog: false,
      image: null,
      isSelecting: false,
    };
  },


  methods: {
    onResize() {
      if (window.innerWidth < 769)
       this.isMobile = true;
      else this.isMobile = false;
    },

    onSelectedFile() {

      this.$refs.inputAvatar.click()
    },

    onFilePicked(event){

      const files = event.target.files[0]

      if (!files.type.includes('image/')) {
        alert('Please select an image file');
        return;
      }
      this.image = {data: files}
      this.showAvatarDialog = true
    },

    handleUpdateUserInfo(){
      var userId = this.$route.params.id
      User.api().updateUserInfo(userId, this.employeeInfo)
    }

  },

  computed: {
    employeeInfo(){
      return {... User.getters('getCurrentEmployee') }
    },
    userInfo(){
      return User.getters('getCurrentUser')
    },
    avatar(){
      return User.getters('getAvatarCurrentUser')
    }
  }
  
};
</script>
