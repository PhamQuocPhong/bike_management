<template>
  <v-container>
    <v-row>
      <label-table title="Warehouse"> </label-table>
    </v-row>
    <v-row>
      <v-flex :class="{ 'pa-4': !isMobile }">
        <v-card flat>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col md="4" sm="6" cols="12">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col
              cols="12"
              md="4"
              v-for="(item, index) in rooms"
              :key="item.id"
            >
              <v-card max-width="344">
                <v-list-item>
                  <v-list-item-avatar color="grey"></v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="headline">{{
                      item.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.user.employee.fullName
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                  height="194"
                ></v-img>

                <v-card-text>
                  Visit ten places on our planet that are undergoing the biggest
                  changes today.
                </v-card-text>

                <v-card-actions class="justify-end">
                  <v-btn
                    @click="joinRoom(item.id)"
                    outlined
                    text
                    color="white"
                    class="primary"
                  >
                    <v-icon>mdi-plus</v-icon>
                    Join
                  </v-btn>

                  <v-btn text color="white" class="primary">
                    50
                    <v-icon>mdi-account</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-row>
    <pin-dialog
      :pin.sync="pin"
      :showPinDialog.sync="showPinDialog"
      title="Pin"
      v-if="showPinDialog"
    >
    </pin-dialog>
  </v-container>
</template>

<script>
// store
import Room from "@/store/models/room";
import ComponentStore from "@/store/models/component";
export default {
  data() {
    return {
      currentPage: this.$appConfig.pagination.CURENT_PAGE,
      itemsPerPage: this.$appConfig.pagination.ITEMS_PER_PAGE,
      itemsPerPageList: this.$appConfig.pagination.ITEMS_PER_PAGE_LIST,
      pageCounts:  this.$appConfig.pagination.PAGE_COUNTS_DEFAULT,
      search: "",

      isMobile: false,
      rooms: [],
      pin: "",
      showPinDialog: false,
      roomSelected: ""
    };
  },

  async created() {
    ComponentStore.dispatch("loadingProgress", { option: "show" });
    setTimeout(async () => {
      await this.retrieveData();
      ComponentStore.dispatch("loadingProgress", { option: "hide" });
    }, 500);
  },

  methods: {
    nextPage() {},

    async retrieveData() {
      setTimeout(async () => {
        const res = await Room.api().fetchPaging(this.currentPage, this.itemsPerPage);
        if (res.response.status === 200) {
          this.rooms = res.response.data.data;
        }
      }, 500)
    },

    joinRoom(id) {
      this.roomSelected = id;
      this.showPinDialog = true;
    }
  },

  watch: {
    pin(val) {
      var payload = { pin: val };
      var loader = this.$loading.show();

      Room.api()
        .joinRoom(this.roomSelected, payload)
        .then(res => {
          setTimeout(() => {
            if (res.response.status === 200 && res.response.data.data) {
              this.$socket.emit("USER_JOIN_ROOM", {
                roomId: this.roomSelected
              });
              this.$router.push("/chat/room/" + this.roomSelected);
            } else {
              toastr.error("Pin does not matched", "Error!", {
                timeOut: 1000
              });
            }

            loader.hide();
          }, 500);
        });
    }
  },

  computed: {},

  destroyed() {}
};
</script>
