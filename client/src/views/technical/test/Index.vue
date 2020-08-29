<template>
  <v-container>
    <v-row>
      <label-table title="Technical test"> </label-table>
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
                    <th>Bike code</th>
                    <th>Image</th>
                    <th>Vehicle type</th>
                    <th>Registration plate</th>
                    <th>Bike status</th>
                    <th>Range Price</th>
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
                    v-for="(item, index) in vehicleTests"
                    :key="item.id"
                    v-else
                  >
                    <td>
                      {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                    </td>
                    <td>{{ item.bikeCode }}</td>
                    <td>
                      <v-img
                        height="50"
                        width="100"
                        contain
                        :src="item.image"
                      ></v-img>
                    </td>
                    <td>{{ item.vehicleType.name }}</td>
                    <td>{{ item.registrationPlate }}</td>
                    <td>
                      <v-chip
                        :color="$helper.colorStatusBike(item.bikeStatus)"
                        class="justify-center status-bike"
                        small
                        dark
                        v-if="item.bikeStatus"
                      >
                        {{ item.bikeStatus }}
                      </v-chip>

                      <v-chip
                        :color="$helper.colorStatusBike(item.bikeStatus)"
                        class="justify-center status-bike"
                        small
                        dark
                        v-else
                      >
                        waiting
                      </v-chip>
                    </td>
                    <td>
                      <div v-if="item.minPrice">
                        {{ item.minPrice | toCurrency  }} - {{ item.maxPrice | toCurrency  }} 
                      </div>
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
                  v-for="(item, index) in vehicleTests"
                  :key="item.id"
                  v-if="loadData"
                >
                  <td>
                    <ul class="flex-content">
                      <li class="flex-item" data-label="No.">
                        {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                      </li>
                      <li class="flex-item" data-label="Accessory">
                        {{ item.bikeCode }}
                      </li>
                      <li class="flex-item" data-label="Start date">
                        <v-img
                          height="50"
                          width="100"
                          contain
                          :src="item.image"
                        ></v-img>
                      </li>
                      <li class="flex-item" data-label="End date">
                        {{ item.vehicleType.name }}
                      </li>
                      <li class="flex-item" data-label="Registration plate">
                        {{ item.registrationPlate }}
                      </li>
                      <li class="flex-item" data-label="Status bike">
                        <v-chip
                          :color="$helper.colorStatusBike(item.bikeStatus)"
                          class="justify-center status-bike"
                          small
                          dark
                          v-if="item.bikeStatus"
                        >
                          {{ item.bikeStatus }}
                        </v-chip>

                        <v-chip
                          :color="$helper.colorStatusBike(item.bikeStatus)"
                          class="justify-center status-bike"
                          small
                          dark
                          v-else
                        >
                          waiting
                        </v-chip>
                      </li>
                      <li class="flex-item" data-label="Price">
                        <div v-if="item.minPrice">
                          {{ item.minPrice }} - {{ item.maxPrice }} $
                        </div>
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
          <vehicle-test
            v-if="technicalTestEdit"
            :role="role"
            :vehicleTest.sync="vehicleTest"
          >
          </vehicle-test>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import VehicleTestComponent from "./VehicleTest.vue";
import TechnicalTest from "@/store/models/technical_test";
import VehicleTest from "@/store/models/vehicle_test";
import Modal from "@/store/models/modal";
import ComponentStore from "@/store/models/component";


export default {
  components: {
    "vehicle-test": VehicleTestComponent
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
      vehicleTest: "",
      role: "technical",
      isMobile: false,
      loadData: false,
    };
  },

  mounted() {},

  methods: {
    edit(item) {
      this.vehicleTest = { ...item };
      Modal.dispatch("technicalTestEdit", { option: "show" });
    },

    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },

    async retrieveData() {
      this.loadData = false;
      setTimeout(async () => {
        const res = await TechnicalTest.api().fetchPaging(
          this.currentPage,
          this.itemsPerPage
        );
        if (res.response.status === 200) {
          TechnicalTest.insert({ data: res.response.data.data });
          this.loadData = true;
          this.pageCounts = res.response.data.pageCounts;
        }
      }, 500);
    },

    nextPage(page) {
      this.currentPage = page;
      this.retrieveData();
    }
  },

  computed: {
    vehicleTests() {
      var itemsPerPage = this.itemsPerPage;
      var offset = this.$helper.calcPagination(this.currentPage, itemsPerPage)

      return VehicleTest.query()
        .with("technicalTest")
        .with("vehicleType")
        .offset(offset)
        .limit(itemsPerPage)
        .get();
    },

    employeeInfo() {
      return this.$cookies.get("dataUser").employee;
    },

    technicalTestEdit() {
      return Modal.getters("technicalTestEdit");
    }
  }
};
</script>
