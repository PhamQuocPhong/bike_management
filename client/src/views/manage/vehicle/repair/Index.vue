<template>
  <v-container>
    <v-row>
      <label-table title="Vehicle repair"> </label-table>
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
                      <th>Vehicle name</th>
                      <th>Image</th>
                      <th>Start date</th>
                      <th>End date</th>
                      <th>Total fix price</th>
                      <th>Buy price</th>
                      <th>Aprrove price</th>
                      <th>Fix status</th>
                      <th>Publish</th>
                      <th>Note</th>
                      <th class="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>


                    <tr v-if="!loadData">
                        <td colspan="100%">
                          <skeleton-custom></skeleton-custom>
                        </td>
                    </tr>

                    <tr v-else v-for="(item, index) in vehicleRepairs" :key="item.id">
                      <td>
                        {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                      </td>
                      <td>{{ item.vehiclePurchase.name }}</td>
                      <td>
                        <v-img
                          height="50"
                          width="100"
                          contain
                          :src="item.vehiclePurchase.image"
                        ></v-img>
                      </td>
                      <td>{{ item.startDate }}</td>
                      <td>{{ item.endDate }}</td>
                      <td class="text-center">
                        {{ item.fixPrice | toCurrency }}
                      </td>
                      <td class="text-center">
                        {{ item.vehiclePurchase.price | toCurrency }}
                      </td>
                      <td class="text-center font-weight-bold">
                        {{ item.price | toCurrency }}
                      </td>
                      <td>
                        <v-chip
                          small
                          dark
                          :color="$helper.colorStatusFixing(item.fixFlg)"
                        >
                          {{ item.fixFlg === 1 ? "Finished" : "Fixing" }}
                        </v-chip>
                      </td>

                      <td>
                        <v-switch
                          v-if="item.fixFlg === 1 && item.price"
                          v-model="item.pushlishFlg"
                          @change="publishVehicleRepair(item)"
                          :disabled="item.pushlishFlg === 1"
                        >
                        </v-switch>

                        <v-switch
                          v-else
                          v-model="item.pushlishFlg"
                          @click.stop="stop(item)"
                          :disabled="!item.price"
                        >
                        </v-switch>
                      </td>
                      <td>{{ item.note }}</td>
                      <td class="text-center">
                        <v-btn
                          color="white"
                          small
                          class="primary mr-4"
                          @click="edit(item)"
                          >View</v-btn
                        >
                        <v-btn color="white" small class="warning">Cancel</v-btn>
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
                    v-for="(item, index) in vehicleRepairs"
                    :key="item.id"
                    v-if="loadData"
                  >
                    <td>
                      <ul class="flex-content">
                        <li class="flex-item" data-label="No.">
                          {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                        </li>
                        <li class="flex-item" data-label="Vehicle name">
                          {{ item.vehiclePurchase.name }}
                        </li>
                        <li class="flex-item" data-label="Image">
                          <v-img
                            height="50"
                            width="70"
                            contain
                            :src="item.vehiclePurchase.image"
                          ></v-img>
                        </li>
                        <li class="flex-item" data-label="Start date">
                          {{ item.startDate }}
                        </li>
                        <li class="flex-item" data-label="End date">
                          {{ item.endDate }}
                        </li>
                        <li class="flex-item" data-label="Total fix price">
                          {{ item.fixPrice | toCurrency }}
                        </li>
                        <li class="flex-item" data-label="Buy price">
                          {{ item.vehiclePurchase.price | toCurrency }}
                        </li>
                        <li
                          class="flex-item font-weight-bold"
                          data-label="Aprrove price"
                        >
                          {{ item.price | toCurrency }}
                        </li>
                        <li class="flex-item" data-label="Fix status">
                          <v-chip
                            small
                            dark
                            :color="$helper.colorStatusFixing(item.fixFlg)"
                          >
                            {{ item.fixFlg === 1 ? "Finished" : "Fixing" }}
                          </v-chip>
                        </li>

                        <li class="flex-item" data-label="Publish">
                          <v-switch
                            class="mt-0"
                            v-if="item.fixFlg === 1 && item.price"
                            v-model="item.pushlishFlg"
                            @change="publishVehicleRepair(item)"
                            :disabled="item.pushlishFlg === 1"
                          >
                          </v-switch>

                          <v-switch
                            class="mt-0"
                            v-else
                            v-model="item.pushlishFlg"
                            @click.stop="stop(item)"
                            :disabled="!item.price"
                          >
                          </v-switch>
                        </li>
                        <li class="flex-item" data-label="Note">
                          {{ item.note }}
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

    <vehicle-repair
      v-if="manageVehicleRepairEdit"
      :vehicleRepair.sync="vehicleRepair"
    ></vehicle-repair>
  </v-container>
</template>

<script>
// component
import VehicleRepairEdit from "./Edit";
import ComponentStore from "@/store/models/component";

// store
import VehicleRepair from "@/store/models/vehicle_repair";
import Modal from "@/store/models/modal";

export default {
  components: {
    "vehicle-repair": VehicleRepairEdit
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
      vehicleRepair: null,
      isMobile: false,
      loadData: false
    };
  },

  mounted() {},

  methods: {
    edit(item) {
      Modal.dispatch("manageVehicleRepairEdit", { option: "show" });
      this.vehicleRepair = { ...item };
    },

    async retrieveData() {

      setTimeout(async () => {
        const res = await VehicleRepair.api().fetchPaging(
          this.currentPage,
          this.itemsPerPage
        );
        if (res.response.status === 200) {
          this.loadData = true;
          VehicleRepair.insert({ data: res.response.data.data });
          this.pageCounts = res.response.data.pageCounts;
        }
      }, 500)
    },

    async stop(item) {
      if (item.pushlishFlg === 1) {
        toastr.warning("This vehicle must be fixed!", "Warning!", {
          timeOut: 1000
        });
      } else if (!item.price) {
        toastr.warning("Please approve price for vehicle!", "Warning!", {
          timeOut: 1000
        });
      }
    },

    async publishVehicleRepair(item) {
      const vehicleRepairId = item.id;
      item.pushlishFlg = item.pushlishFlg === true ? 1 : 0;
      const res = await VehicleRepair.api().publish(vehicleRepairId, item);
      if (res.response.status === 200) {
        VehicleRepair.update({
          where: vehicleRepairId,
          data: res.response.data.data
        });
        toastr.success(res.response.data.message, "Success!", {
          timeOut: 1000
        });
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
    vehicleRepairs() {
      var itemsPerPage = this.itemsPerPage;
      var page = this.currentPage;
      if (page == 1) {
        this.offset = 0;
      } else {
        this.offset = (page - 1) * itemsPerPage;
      }
      return VehicleRepair.query()
        .with("vehiclePurchase")
        .offset(this.offset)
        .limit(itemsPerPage)
        .get();
    },
    manageVehicleRepairEdit() {
      return Modal.getters("manageVehicleRepairEdit");
    }
  }
};
</script>
