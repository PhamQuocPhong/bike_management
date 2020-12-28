<template>
  <div>
    <v-layout row justify-center>
      <v-dialog
        v-model="manageRoomEdit"
        persistent
        max-width="900"

      >
        <v-card>
          <v-card-title class="headline d-flex pb-4">
            Edit Room
          </v-card-title>
          <v-card-text class="mt-4">
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-container>
                <v-row v-if="getManageRoom">
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Room name"
                      v-model="getManageRoom.name"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Room pin"
                      v-model="getManageRoom.pin"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Maximum person"
                      v-model="getManageRoom.maximum"
                    ></v-text-field>
                  </v-col>

                  
                  <v-col
                    cols="12"
                    md="6"
                    sm="6"
                  >
                    <v-img
                      height="50"
                      width="100"
                      contain
                      :src="getManageRoom.image"
                    ></v-img>
                  </v-col>


                  <v-col cols="12"
                    md="12"
                    sm="12">
                    <upload :image.sync="getManageRoom.image"></upload>
                  </v-col>

                </v-row>

                <v-row class="d-flex" align="center"> </v-row>
              </v-container>
            </v-form>
          </v-card-text>

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
              title="Close"
              v-on:action="close()"
              color="blue darken-1"
              type="close"
            >
            </btn-custom>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
// store
import Room from "@/store/models/room";
import Modal from "@/store/models/modal";
// component
import UploadFileComponent from "@/components/custom/DropZone.vue";
export default {

  components: {
    'upload': UploadFileComponent
  },

  props: ["manageRoom"],

  data() {
    return {
      valid: true,
      lazy: false,
      getManageRoom: this.manageRoom
    };
  },

  mounted() {

    console.log(this.manageRoom)

  },

  methods: {
    close() {
      Modal.dispatch("manageRoomEdit", { option: "hide" });
    },

    async save() {
      if (this.$refs.form.validate()) {
        
      }
    },

  },

  computed: {
    manageRoomEdit() {
      return Modal.getters("manageRoomEdit");
    }
  }
};
</script>
