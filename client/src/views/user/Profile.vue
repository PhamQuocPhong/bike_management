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
                  <v-col align-self="start" class="pa-0" cols="12">
                    <v-avatar class="profile" color="grey" size="164" tile>
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
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
                <v-btn color="success" small>Upload avatar</v-btn>
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
                        value="Pham Quoc Phong"
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
                        value="quocphong.fit"
                        suffix="@gmail.com"
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
                        value="04125125"
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
                      <v-textarea
                        rows="3"
                        :no-resize="true"
                        value="861/18/28 Trần Xuân Soạn, phường Tân Hưng, quận 7, Tp. HCM"
                        :disabled="!edit"
                        class="font-weight-bold"
                      >
                      </v-textarea>
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
                        :disabled="!edit"
                        class="font-weight-bold"
                        value="Giám đốc"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-spacer></v-spacer>

                    <v-btn @click="edit = true" color="success" small>
                      Edit
                    </v-btn>

                    <v-divider class="mx-2" vertical> </v-divider>

                    <v-btn color="primary" small>
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
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { text: "Profile", icon: "mdi-clock" },
        { text: "Notify", icon: "mdi-account" }
      ],
      edit: false,
      isMobile: false
    };
  },

  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;

      console.log(this.isMobile);
    }
  }
};
</script>
