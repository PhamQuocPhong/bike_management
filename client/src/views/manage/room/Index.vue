<template>
  <v-container>
        <v-row>
      <label-table title="Room"> </label-table>
    </v-row>
    <v-row>
      <v-flex :class="{ 'pa-4': !isMobile }">
        <v-card flat>
          <v-row no-gutters>
            <v-btn class="mr-4" small color="primary" @click="create()"
              >Create</v-btn
            >

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

            <v-col md="2" sm="6" cols="12" v-if="!isMobile">
              <v-select
                :items="itemsPerPageList"
                label="Item per page"
                v-model="itemsPerPage"
                @change="changePerPage()"
                class="ml-4"
              ></v-select>
            </v-col>
          </v-row>

          <v-layout
            v-resize="onResize"
            column
            class="table"
            :class="{ 'mt-4': isMobile }"
          >
            <v-simple-table :class="{ mobile: isMobile }">
              <template v-slot:default v-if="!isMobile">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Pin</th>
                    <th>Create date</th>
                    <th>Maximum</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!loadData">
                    <td colspan="100%">
                       <skeleton-custom></skeleton-custom>
                    </td>
                  </tr>

                  <tr v-else v-for="(item, index) in rooms" :key="item.id" >
                    <td>
                       {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                    </td>
                    <td>{{ item.name }}</td>
                    <td>
                      <v-img
                        height="50"
                        width="100"
                        contain
                        :src="item.image"
                      ></v-img>
                    </td>
                    <td>{{ item.pin }}</td>
                    <td>{{ $helper.convertTzTo(item.date) }}</td>
                    <td>{{ item.maximum }}</td>

                    <td class="text-center">
                       <btn-custom 
                        icon="mdi-square-edit-outline"
                        :classProp="`primary mr-4`"
                        v-on:action="edit(item)"
                        type="edit"
                        >
                      </btn-custom>

                      <btn-custom 
                        icon="mdi-delete-outline"
                        :classProp="`warning`"
                        type="delete"
                      >
                      </btn-custom>
                    </td>
                  </tr>
                </tbody>
              </template>

              <template v-slot:default v-else>
                <tr v-if="!loadData">
                    <td colspan="100%">
                       <skeleton-custom></skeleton-custom>
                    </td>
                </tr>

                <tr v-else v-for="(item, index) in rooms" :key="item.id">
                  <td>
                    <ul class="flex-content">
                      <li>
                          {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                      </li>
                      <li>{{ item.name }}</li>
                      <li>{{ item.pin }}</li>
                      <li>
                        <v-img
                          height="50"
                          width="100"
                          contain
                          :src="item.image"
                        ></v-img>
                      </li>
                      <li>{{ $helper.convertTzTo(item.date) }}</li>
                      <li>{{ item.maximum }}</li>

                      <li class="text-center">
                        <btn-custom 
                          icon="mdi-square-edit-outline"
                          :classProp="`primary mr-4`"
                          v-on:action="edit(item)"
                          type="edit"
                          >
                        </btn-custom>

                        <btn-custom 
                          icon="mdi-delete-outline"
                          :classProp="`warning`"
                          type="delete"
                        >
                        </btn-custom>
                      </li>
                    </ul>
                  </td>
                </tr>
              </template>
            </v-simple-table>
          </v-layout>

          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="currentPage"
                  class="my-4"
                  :length="pageCounts"
                  @input="nextPage"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-row>

    <create 
      v-if="manageRoomCreate"
    >
    </create>
    <edit 
    v-if="manageRoomEdit"
    :manageRoom.sync="room"
    >
    </edit>
  </v-container>
</template>

<script>
import Room from "@/store/models/room";

import Modal from "@/store/models/modal";

import CreateComponent from "./Create.vue";
import EditComponent from "./Edit.vue";

export default {
  components: {
    'create': CreateComponent,
    'edit': EditComponent
  },

  async created() {
    var progress = this.$Progress;
    progress.start();
    await this.retrieveData();
    progress.finish();
  },

  data() {
    return {
      currentPage: this.$appConfig.pagination.CURENT_PAGE,
      itemsPerPage: this.$appConfig.pagination.ITEMS_PER_PAGE,
      itemsPerPageList: this.$appConfig.pagination.ITEMS_PER_PAGE_LIST,
      pageCounts:  this.$appConfig.pagination.PAGE_COUNTS_DEFAULT,
      search: "",

      isMobile: false,
      loadData: false,
      room: null

    };
  },

  mounted() {},

  methods: {
    create() {
      Modal.dispatch("manageRoomCreate", { option: "show" });
    },

    edit(item) {
      this.room = { ...item };
      Modal.dispatch("manageRoomEdit", { option: "show" });
    },
    nextPage(page) {
      this.currentPage = page;
      this.loadData = false;
      this.retrieveData();
    },
    async retrieveData() {
      this.loadData = false;
      setTimeout(async () => {
        const res = await Room.api().fetchPaging(
          this.currentPage,
          this.itemsPerPage
        );
        if (res.response.status === 200) {
          Room.insert({ data: res.response.data.data });
          this.loadData = true;
          this.pageCounts = res.response.data.pageCounts;
        }
      }, 500);
    },

    changePerPage() {
      this.retrieveData();
    },

    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  },

  computed: {
    rooms() {
      var itemsPerPage = this.itemsPerPage;
      var offset = this.$helper.calcPagination(this.currentPage, itemsPerPage)

      return Room.query()
        .offset(offset)
        .limit(itemsPerPage)
        .get();
    },

    manageRoomCreate() {
      return Modal.getters("manageRoomCreate");
    },

    manageRoomEdit() {
      return Modal.getters("manageRoomEdit");
    }
  },

  destroyed() {
    Room.deleteAll();
  }
};
</script>
