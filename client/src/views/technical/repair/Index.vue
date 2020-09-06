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
            <v-responsive :aspect-ratio="$appConfig.aspectRatio.table">
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

                    <tr v-if="!loadData">
                        <td colspan="100%">
                          <skeleton-custom></skeleton-custom>
                        </td>
                    </tr>

                    <tr
                      v-for="(item, index) in technicalRepairs"
                      :key="item.id"
                      v-else
                    >
                      <td>
                        {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
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

                  <tr
                    v-for="(item, index) in technicalRepairs"
                    :key="item.id"
                    v-else
                  >
                    <td>
                      <ul class="flex-content">
                        <li class="flex-item" data-label="No.">
                          {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
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
            </v-responsive>
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
import ComponentStore from "@/store/models/component";

// store
import TechnicalRepair from "@/store/models/technical_repair";
import Modal from "@/store/models/modal";

export default {
  components: {
    "technical-repair-edit": TechnicalRepairEdit
  },

  async created() {
    ComponentStore.dispatch("loadingProgress", { option: "show" });
    setTimeout(async () => {
      await this.retrieveData();
      ComponentStore.dispatch("loadingProgress", { option: "hide" });
    }, 500);
  },

  data() {
    return {
      currentPage: this.$appConfig.pagination.CURENT_PAGE,
      itemsPerPage: this.$appConfig.pagination.ITEMS_PER_PAGE,
      itemsPerPageList: this.$appConfig.pagination.ITEMS_PER_PAGE_LIST,
      pageCounts:  this.$appConfig.pagination.PAGE_COUNTS_DEFAULT,
      search: "",
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
      this.loadData = false;
      const res = await TechnicalRepair.api().fetchPaging(
        this.currentPage,
        this.itemsPerPage
      );
      if (res.response.status === 200) {
        this.loadData = true;
        TechnicalRepair.insert({ data: res.response.data.data });
        this.pageCounts = res.response.data.pageCounts;
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
      var offset = this.$helper.calcPagination(this.currentPage, itemsPerPage)

      if (this.pageCounts > 0) {
        return TechnicalRepair.query()
          .with("vehicleRepair")
          .offset(offset)
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
