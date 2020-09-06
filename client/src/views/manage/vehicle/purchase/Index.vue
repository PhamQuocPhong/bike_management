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
            <v-responsive :aspect-ratio="$appConfig.aspectRatio.table">
              <v-simple-table :class="{ mobile: isMobile }">
                <template v-slot:default v-if="!isMobile">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Color</th>
                      <th>Image</th>
                      <th>Registration plate</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th class="text-center" style="width: 200px;">Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr v-if="!loadData">
                        <td colspan="100%">
                          <skeleton-custom></skeleton-custom>
                        </td>
                    </tr>

                    <tr v-else v-for="(item, index) in vehiclePurchases" :key="item.id">
                      <td>
                         {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
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
                    v-for="(item, index) in vehiclePurchases"
                    :key="item.id"
                    v-else
                  >
                    <td>
                      <ul class="flex-content">
                        <li class="flex-item" data-label="No.">
                           {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
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

    <vehicle-purchase
      v-if="manageVehiclePurchaseEdit"
      :vehiclePurchase.sync="vehiclePurchase"
    ></vehicle-purchase>
  </v-container>
</template>

<script>
// component
import VehilcePurChaseEdit from "./Edit";
import ComponentStore from "@/store/models/component";

// store
import VehiclePurchase from "@/store/models/vehicle_purchase";
import Modal from "@/store/models/modal";

export default {
  components: {
    "vehicle-purchase": VehilcePurChaseEdit
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
      role: "technical",
      dialogEdit: false,
      vehiclePurchase: null,

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
      this.loadData = false;
      setTimeout(async () => {
        const res = await VehiclePurchase.api().fetchPaging(
          this.currentPage,
          this.itemsPerPage
        );
        if (res.response.status === 200) {
          this.loadData = true;
          VehiclePurchase.insert({ data: res.response.data.data });
          this.pageCounts = res.response.data.pageCounts;
        }
      }, 500)
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
