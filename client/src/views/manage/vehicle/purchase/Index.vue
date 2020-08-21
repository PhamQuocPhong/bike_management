<template>
  <v-container>
    <v-row>
      <label-table title="Vehicle purchase"> </label-table>
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
            <v-simple-table :class="{ mobile: isMobile }">
              <template v-slot:default v-if="!isMobile">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Image</th>
                    <th>Code</th>
                    <th>Registration plate</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th class="text-center" style="width: 200px;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in vehiclePurchases" :key="item.id">
                    <td>
                      {{ $helper.indexColumn(item, vehiclePurchases) }}
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.color }}</td>
                    <td>
                      <v-img
                        height="50"
                        width="100"
                        contain
                        :src="item.image"
                      ></v-img>
                    </td>
                    <td>{{ item.code }}</td>
                    <td>{{ item.registrationPlate }}</td>
                    <td>
                      <v-chip
                        :color="$helper.colorStatusBike(item.status)"
                        class="justify-center status-bike"
                        small
                        dark
                      >
                        {{ item.status }}
                      </v-chip>
                    </td>
                    <td>{{ item.price | toCurrency }}</td>
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
                  v-for="(item, index) in vehiclePurchases"
                  :key="item.id"
                  v-if="loadData"
                >
                  <td>
                    <ul class="flex-content">
                      <li class="flex-item" data-label="No.">
                        {{ $helper.indexColumn(item, vehiclePurchases) }}
                      </li>
                      <li class="flex-item" data-label="Name">
                        {{ item.name }}
                      </li>
                      <li class="flex-item" data-label="Color">
                        {{ item.color }}
                      </li>
                      <li class="flex-item" data-label="Image">
                        <v-img
                          height="50"
                          width="100"
                          contain
                          :src="item.image"
                        ></v-img>
                      </li>
                      <li class="flex-item" data-label="Code">
                        {{ item.code }}
                      </li>
                      <li class="flex-item" data-label="Registration plate">
                        {{ item.registrationPlate }}
                      </li>
                      <li class="flex-item" data-label="Status">
                        <v-chip
                          :color="$helper.colorStatusBike(item.status)"
                          class="justify-center status-bike"
                          small
                          dark
                        >
                          {{ item.status }}
                        </v-chip>
                      </li>
                      <li class="flex-item" data-label="Price">
                        {{ item.price | toCurrency }}
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

    <vehicle-purchase
      v-if="manageVehiclePurchaseEdit"
      :vehiclePurchase.sync="vehiclePurchase"
    ></vehicle-purchase>
  </v-container>
</template>

<script>
// component
import VehilcePurChaseEdit from "./Edit";

// store

import VehiclePurchase from "@/store/models/vehicle_purchase";
import Modal from "@/store/models/modal";

export default {
  components: {
    "vehicle-purchase": VehilcePurChaseEdit
  },

  async created() {
    this.retrieveData();
  },

  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      itemsPerPageList: [5, 10, 15],
      dialogVehicleTest: false,
      vehicleTest: "",
      role: "technical",
      currentPage: 1,
      dialogEdit: false,
      vehiclePurchase: null,
      pageCounts: 0,

      isMobile: false,
      loadData: false
    };
  },

  mounted() {},

  methods: {
    edit(item) {
      this.vehiclePurchase = { ...item };
      Modal.dispatch("manageVehiclePurchaseEdit", { option: "show" });
    },

    async retrieveData() {
      var progress = this.$Progress;
      progress.start();
      const res = await VehiclePurchase.api().fetchPaging(
        this.currentPage,
        this.itemsPerPage
      );
      if (res.response.status === 200) {
        this.loadData = true;
        VehiclePurchase.insert({ data: res.response.data.data });
        this.pageCounts = res.response.data.pageCounts;
        progress.finish();
      } else {
        progress.fail();
      }
    },

    nextPage(page) {
      this.currentPage = page;
      this.retrieveData();
    },
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  },

  computed: {
    vehiclePurchases() {
      return VehiclePurchase.query()
        .with("receptionCustomerSell", query => {
          query.with("employee").with("customer");
        })
        .with("vehicleRepair")
        .get();
    },

    manageVehiclePurchaseEdit() {
      return Modal.getters("manageVehiclePurchaseEdit");
    }
  }
};
</script>
