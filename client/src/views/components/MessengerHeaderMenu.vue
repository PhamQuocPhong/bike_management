<template>
  <v-layout>
    <v-menu transition="slide-y-transition" class="menu" v-model="visible">
      <template v-slot:activator="{ on: activeNotify }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltipNotify }">
            <div v-on="tooltipNotify">
              <v-btn tile large icon v-on="activeNotify">
                <v-badge bordered color="error" dot overlap>
                  <v-icon>mdi-message</v-icon>
                </v-badge>
              </v-btn>
            </div>
          </template>
          <span>Notify</span>
        </v-tooltip>
      </template>

      <v-list two-line v-scroll.self="onScroll" min-width="500">
        <v-list-item-group multiple active-class="pink--text">
          <template v-for="(item, index) in userNotifications">
            <v-list-item :key="item.title">
              <template v-slot:default="{ active, toggle }">
                <v-list-item-content>
                  <v-list-item-title
                    class="font-weight-bold"
                    v-text="item.senderName"
                  ></v-list-item-title>

                  <v-list-item-subtitle
                    v-text="item.name"
                    class="pt-2"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="item.spaceTime"
                  ></v-list-item-action-text>

                  <v-icon v-if="!active" color="grey lighten-1">
                    star_border
                  </v-icon>

                  <v-icon v-else color="yellow">
                    star
                  </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider
              v-if="index + 1 < userNotifications.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list-item-group>
        <v-progress-linear
          v-show="loadingProgress"
          :indeterminate="loadingProgress"
          absolute
          bottom
          color="cyan"
        ></v-progress-linear>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<style scoped="">
.v-list {
  height: 400px;
  overflow-y: auto;
}
.menu {
  z-index: 10;
}
</style>

<script>
import UserNotification from "@/store/models/user_notification";

export default {
  data() {
    return {
      visible: false,
      userInfo: this.$cookies.get("dataUser"),
      userNotifications: [],
      loadData: false,
      page: 1,
      itemPerPage: 10,
      type: "message",
      loadingProgress: false,
      nextPageAllow: true
    };
  },

  mounted() {},

  watch: {
    visible(val) {
      if (!val) {
        UserNotification.deleteAll();
        this.resetData();
      } else {
        this.retrieveData();
      }
    }
  },

  methods: {
    async retrieveData() {
      var userId = this.userInfo.id;
      const res = await UserNotification.api().fetchPaging(
        userId,
        this.type,
        this.page,
        this.itemPerPage
      );
      if (res.response.status === 200) {
        UserNotification.insert({ data: res.response.data.data });
        this.userNotifications = res.response.data.data;
      }
    },

    async onScroll(e) {
      if (e.target.scrollHeight - 400 === e.target.scrollTop) {
        this.loadData = true;
        if (this.loadData === true && this.nextPageAllow !== false) {
          this.loadingProgress = true;
          this.page++;
          var userId = this.userInfo.id;
          setTimeout(() => {
            UserNotification.api()
              .fetchPaging(userId, this.type, this.page, this.itemPerPage)
              .then(res => {
                if (res.response.data.data.length > 0) {
                  this.userNotifications.push(...res.response.data.data);
                } else {
                  this.nextPageAllow = false;
                }
                this.loadingProgress = false;
              });
          }, 500);
        } else {
          this.loadData = false;
        }
      }
    },

    resetData() {
      this.userNotifications = [];
      this.loadData = false;
      this.page = 1;
      this.loadingProgress = false;
      this.nextPageAllow = true;
    }
  },

  computed: {}
};
</script>
