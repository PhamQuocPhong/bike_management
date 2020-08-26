<template>
  <v-container>
    <v-row>
      <label-table title="Technical repair"> </label-table>
    </v-row>

    <v-row>
      <v-flex :class="{ 'pa-4': !isMobile }">
        <v-card flat >
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

            <v-col md="2" sm="6" cols="12" v-if="!isMobile">
              <v-select
                :items="itemsPerPageList"
                label="Item per page"
                v-model="itemsPerPage"
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
                    <th>Accessory</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Price</th>
                    <th>Fisnish</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in technicalRepairs"
                    :key="item.id"
                    v-if="loadData"
                  >
                    <td>
                      {{ $helper.indexColumn(item, technicalRepairs) }}
                    </td>
                    <td>{{ item.accessory }}</td>
                    <td>{{ $helper.formatDate(item.startDate) }}</td>
                    <td>{{ $helper.formatDate(item.endDate) }}</td>
                    <td>{{ item.price | toCurrency }}</td>
                    <td>
                      <v-chip
                        small
                        dark
                        :color="$helper.colorStatusFinish(item.finishFlg)"
                      >
                        {{ item.finishFlg === 1 ? "Finished" : "Fixing" }}
                      </v-chip>
                    </td>
                    <td class="text-center">
                      <v-btn
                        color="white"
                        small
                        class="primary mr-4"
                        @click="edit(item)"
                      >
                        <v-icon>mdi-square-edit-outline</v-icon>
                      </v-btn>
                      <v-btn color="white" small class="warning">
                        <v-icon>mdi-delete-outline</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>

              <template v-slot:default v-else>
                <tr
                  v-for="(item, index) in technicalRepairs"
                  :key="item.id"
                  v-if="loadData"
                >
                  <td>
                    <ul class="flex-content">
                      <li class="flex-item" data-label="No.">
                        {{ $helper.indexColumn(item, technicalRepairs) }}
                      </li>
                      <li class="flex-item" data-label="Accessory">
                        {{ item.accessory }}
                      </li>
                      <li class="flex-item" data-label="Start date">
                        {{ $helper.formatDate(item.startDate) }}
                      </li>
                      <li class="flex-item" data-label="End date">
                        {{ $helper.formatDate(item.endDate) }}
                      </li>
                      <li class="flex-item" data-label="Price">
                        {{ item.price | toCurrency }}
                      </li>
                      <li class="flex-item" data-label="Fisnish">
                        <v-chip
                          small
                          dark
                          :color="$helper.colorStatusFinish(item.finishFlg)"
                        >
                          {{ item.finishFlg === 1 ? "Finished" : "Fixing" }}
                        </v-chip>
                      </li>
                      <li class="flex-item" data-label="Action">
                        <v-btn
                          color="white"
                          small
                          class="primary mr-4"
                          @click="edit(item)"
                        >
                          <v-icon>mdi-square-edit-outline</v-icon>
                        </v-btn>
                        <v-btn color="white" small class="warning">
                          <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
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
    <technical-repair-edit
      v-if="technicalRepairEdit"
      :technicalRepair.sync="technicalRepair"
    ></technical-repair-edit>
  </v-container>
</template>

<script>
//component

import TechnicalRepairEdit from "./Edit";

// store
import TechnicalRepair from "@/store/models/technical_repair";
import Modal from "@/store/models/modal";

export default {
  components: {
    "technical-repair-edit": TechnicalRepairEdit
  },

  async created() {
    this.retrieveData();
  },

  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      search: "",
      itemsPerPageList: [5, 10, 15],
      pageCounts: 0,
      offset: 0,
      technicalRepair: null,
      isMobile: false,
      loadData: false
    };
  },

  mounted() {},

  methods: {
    edit(item) {
      this.technicalRepair = { ...item };
      Modal.dispatch("technicalRepairEdit", { option: "show" });
    },
    nextPage(page) {
      this.currentPage = page;
      this.retrieveData();
    },
    async retrieveData() {
      var progress = this.$Progress;
      progress.start();
      const res = await TechnicalRepair.api().fetchPaging(
        this.currentPage,
        this.itemsPerPage
      );
      if (res.response.status === 200) {
        this.loadData = true;
        TechnicalRepair.insert({ data: res.response.data.data });
        this.pageCounts = res.response.data.pageCounts;
        progress.finish();
      } else {
        progress.fail();
      }
    },

    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  },

  computed: {
    technicalRepairs() {
      var itemsPerPage = this.itemsPerPage;
      var page = this.currentPage;
      if (page == 1) {
        this.offset = 0;
      } else {
        this.offset = (page - 1) * itemsPerPage;
      }

      if (this.pageCounts > 0) {
        return TechnicalRepair.query()
          .with("vehicleRepair")
          .offset(this.offset)
          .limit(itemsPerPage)
          .get();
      }
    },

    employeeInfo() {
      return this.$cookies.get("dataUser").employee;
    },

    technicalRepairEdit() {
      return Modal.getters("technicalRepairEdit");
    }
  }
};
</script>
