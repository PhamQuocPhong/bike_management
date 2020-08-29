<template>
  <v-container>
    <v-row>
      <label-table title="Sales"> </label-table>
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
                      <th>Customer name</th>
                      <th>Customer phone</th>
                      <th>Require</th>
                      <th>Contact</th>
                      <th>Progess</th>
                      <th class="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-if="!loadData">
                        <td colspan="100%">
                          <skeleton-custom></skeleton-custom>
                        </td>
                    </tr>

                    <tr v-else v-for="(item, index) in Sales" :key="item.id">
                      <td>
                        {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                      </td>
                      <td>{{ item.salesCustomerBuy.customer.name }}</td>
                      <td>{{ item.salesCustomerBuy.customer.phoneNumber }}</td>
                      <td>{{ item.salesCustomerBuy.customerRequire }}</td>
                      <td>
                        <v-switch
                          v-model="item.salesCustomerBuy.contactFlg"
                          @change="contactCustomer(item)"
                          :disabled="item.salesCustomerBuy.contactFlg === 1"
                        >
                        </v-switch>
                      </td>
                      <td>
                        <v-chip
                          small
                          :color="
                            $helper.colorStatusTransaction(item.salesCustomerBuy)
                          "
                          dark
                        >
                          {{ item.salesCustomerBuy.status }}
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
                  <tr v-if="!loadData">
                      <td colspan="100%">
                         <skeleton-custom></skeleton-custom>
                      </td>
                  </tr>

                  <tr
                    v-for="(item, index) in Sales"
                    :key="item.id"
                    v-else
                  >
                    <td>
                      <ul class="flex-content">
                        <li class="flex-item" data-label="No.">
                          {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                        </li>
                        <li class="flex-item" data-label="Customer name">
                          {{ item.salesCustomerBuy.customer.name }}
                        </li>
                        <li class="flex-item" data-label="Customer phone">
                          {{ item.salesCustomerBuy.customer.phoneNumber }}
                        </li>
                        <li class="flex-item" data-label="Require">
                          {{ item.salesCustomerBuy.customerRequire }}
                        </li>
                        <li class="flex-item" data-label="Contact">
                          <v-switch
                            v-model="item.salesCustomerBuy.contactFlg"
                            @change="contactCustomer(item)"
                            :disabled="item.salesCustomerBuy.contactFlg === 1"
                            class="ma-0"
                          >
                          </v-switch>
                        </li>
                        <li class="flex-item" data-label="Progess">
                          <v-chip
                            small
                            :color="
                              $helper.colorStatusTransaction(
                                item.salesCustomerBuy
                              )
                            "
                            dark
                          >
                            {{ item.salesCustomerBuy.status }}
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
    <edit v-if="salesEdit" :sales.sync="sales"></edit>
  </v-container>
</template>

<script>
import SalesEditComponent from "./Edit.vue";
import ComponentStore from "@/store/models/component";

import Sales from "@/store/models/sales";
import SalesCustomerBuy from "@/store/models/sales_customer_buy";
import Modal from "@/store/models/modal";

export default {
  components: {
    edit: SalesEditComponent
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
      sales: "",
      isMobile: false,
      loadData: false,
       
    };
  },

  mounted() {},

  methods: {
    edit(item) {
      this.sales = { ...item };
      Modal.dispatch("salesEdit", { option: "show" });
    },
    nextPage(page) {
      this.currentPage = page;
      this.retrieveData();
    },
    async retrieveData() {
      this.loadData = false;
      setTimeout(async () => {
        const res = await Sales.api().fetchPaging(
          this.currentPage,
          this.itemsPerPage
        );
        if (res.response.status === 200) {
          Sales.insert({ data: res.response.data.data });
          this.loadData = true;
          this.pageCounts = res.response.data.pageCounts;
        }
      }, 500);
    },

    async stop() {
      toastr.warning("This vehicle must be fixed!", "Warning!", {
        timeOut: 1000
      });
    },

    async contactCustomer(data) {
      var contactFlg = data.salesCustomerBuy.contactFlg === true ? 1 : 0;

      const res = await Sales.api().contactCustomer(data.id, {
        contactFlg: contactFlg,
        customer: data.salesCustomerBuy.customer
      });
      if (res.response.status === 200) {
        SalesCustomerBuy.update({
          id: res.response.data.id,
          data: res.response.data.data
        });
        toastr.success("Contact customer success", "Success!", {
          timeOut: 1000
        });
      }
    },

    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  },

  computed: {
    Sales() {
      var itemsPerPage = this.itemsPerPage;
      var offset = this.$helper.calcPagination(this.currentPage, itemsPerPage)

      return Sales.query()
        .with("salesCustomerBuy", query => {
          query.with("customer").with("vehicleSuggests", query => {
            query.with("vehicle");
          });
        })
        .offset(offset)
        .limit(itemsPerPage)
        .get();
    },
    salesEdit() {
      return Modal.getters("salesEdit");
    }
  }
};
</script>
