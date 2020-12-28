<template>
  <v-col cols="12">
    <v-card>
      <v-toolbar dark color="primary darken-1">
        <v-toolbar-title>Room 1</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y transition="slide-x-transition">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" dark slot="activator">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item-group>
              <template v-for="(item, index) in menu">
                <v-list-item>
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title  v-text="item.title" class="font-weight-bold"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-toolbar>

      <v-card-text
        @v-chat-scroll-top-reached="loadMoreMessenger"
        v-chat-scroll="{ always: false, smooth: true, scrollonremoved: true }"
        class="window-message"
      >
        <v-list
          v-for="(item, index) in listMessengers"
          :key="index"
          class="receive pb-0 pt-0"
        >
          <div class="block" v-if="item.userId !== userInfo.id">
            <v-subheader class="header-name">{{ item.username }}</v-subheader>
            <v-list-item v-if="item.userId !== userInfo.id">
              <v-list-item-avatar class="logo-img">
                <v-img :src="getAvatar(item.userInfo.avatar)"></v-img>
              </v-list-item-avatar>
              <v-list-item-title>
                <v-chip :ripple="false">{{ item.message }}</v-chip>
              </v-list-item-title>
            </v-list-item>
          </div>

          <div class="block" v-else>
            <v-list-item class="justify-end">
              <v-chip color="pink" :ripple="false">{{ item.message }}</v-chip>
            </v-list-item>
          </div>

          <!--    		<div v-if="showStatusUserLeave(listMessengers.length, index)">
		        			<v-subheader class="justify-center">User has left this room</v-subheader>  
		        		</div> -->
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-col cols="12">
          <v-spacer></v-spacer>
          <v-col class="d-flex float-right" md="5" sm="6" cols="12">
            <v-text-field
              v-model="message"
              solo
              clearable
              label="Message"
              hide-details="auto"
              @click:clear="clearMessage"
              class="textfield__message"
            ></v-text-field>
            <v-btn
              @click.sync="send"
              fab
              dark
              small
              color="primary"
              class="ml-4 pa-3"
            >
              <v-icon dark>send</v-icon>
            </v-btn>
          </v-col>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<style lang="scss">
.v-card-text {
  height: 400px;
}
.v-card__actions {
  width: 100%;
}

.window-message {
  overflow-y: scroll;
  height: 500px;
}

.header-name {
  margin-bottom: -15px;
  margin-top: -10px;
}

.theme--dark.textfield__message .v-input__slot {
  background: #383838 !important;
}

.v-chip.pink {
  color: #fff;
}

</style>

<script>
import Modal from "@/store/models/modal";
import User from "@/store/models/user";
export default {
  async created() {

    this.$socket.emit(this.$socketEvent.ROOM_USER_JOIN, {
      roomId: this.$route.params.id
    });
  },

  data() {
    return {
      isMobile: false,
      loadData: false,
      message: "",
      roomId: this.$route.params.id,

      menu: [
        {
          icon: "mdi-account-group",
          title: "Users in room"
        },

        {
          icon: "mdi-arrow-left-bold-circle-outline",
          title: "Leave the room"
        }
      ],

      smooth: false,
      statusUserLeave: false,
      listMessengers: []
    };
  },

  mounted() {


    this.sockets.listener.subscribe(this.$socketEvent.ROOM_SEND_MESSENGER, res => {
      if (res) {
        this.listMessengers.push({
          userInfo: res.userInfo,
          message: res.message
        });
      }
    });

    this.sockets.listener.subscribe(this.$socketEvent.ROOM_USER_LEAVE, res => {
      if (res) {
        this.listMessengers.push({
          userId: res.userId,
          message: res.message
        });
      }
    });
  },

  methods: {
    create() {
      Modal.dispatch("warehouseCreate", { option: "show" });
    },

    edit(item) {
      this.technicalRepair = { ...item };
      Modal.dispatch("warehouseEdit", { option: "show" });
    },

    getAvatar(fileName){
      return this.$appConfig.URL_AVATAR_AWS + fileName
    },

    send() {
      this.listMessengers.push({
        userId: this.userInfo.id,
        message: this.message
      });

      this.$socket.emit(this.$socketEvent.ROOM_SEND_MESSENGER, {
        message: this.message,
        roomId: this.roomId,
        userInfo: this.userInfo
      });
      this.clearMessage();
    },

    clearMessage() {
      this.message = "";
    },

    loadMoreMessenger() {},

    showStatusUserLeave(mesengerLength, index) {
      index++;
      this.statusUserLeave = true;
      return mesengerLength === index;
    }
  },

  computed: {
    userInfo(){
      return User.getters('getCurrentUser')
    }

  },

  beforeDestroy() {
    this.$socket.emit(this.$socketEvent.ROOM_USER_LEAVE, {});
    // var conf = confirm('Do you want to exit?')
    // if(conf){
    // 	return false
    // }
  }
};
</script>
