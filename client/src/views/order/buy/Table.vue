<template>
  <div>
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
              <th>Employee</th>
              <th>Customer</th>
              <th>Total item</th>
              <th>Sub total price</th>
              <th>Tax price</th>
              <th>Total price</th>
              <th>Date</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!loadData">
              <td colspan="100%">
                <v-skeleton-loader
                  ref="skeleton"
                  :type="type"
                  class="mx-auto"
                ></v-skeleton-loader>
              </td>
            </tr>

            <tr v-for="item in transactionBuys" :key="item.id" v-else>
              <td>
                {{ $helper.indexColumn(item, transactionBuys) }}
              </td>
              <td>{{ item.employee.fullName }}</td>
              <td>{{ item.customer.name }}</td>
              <td>{{ item.totalItem }}</td>
              <td>{{ item.subTotalPrice }}</td>
              <td>{{ item.taxPrice }}</td>
              <td>{{ item.totalPrice }}</td>
              <td>{{ item.date }}</td>

              <td class="text-center">
                <btn-custom 
                  icon="mdi-square-edit-outline"
                  :classProp="`primary mr-4`"
                  v-on:action="edit(item)"
                  type="edit"
                  >
                  </btn-custom>

                  <btn-custom 
                  icon="mdi-file-export-outline"
                  :classProp="`success`"
                  v-on:action="reportTransactionBuy(item.id)"
                  type="export"
                  >
                  </btn-custom>
              </td>
            </tr>
          </tbody>
        </template>

        <template v-slot:default v-else>
          <tr
            v-for="(item, index) in transactionBuys"
            :key="item.id"
            v-if="loadData"
          >
            <td>
              <ul class="flex-content">
                <li class="flex-item" data-label="Action">
                  {{ $helper.indexColumn(item, transactionBuys) }}
                </li>
                <li class="flex-item" data-label="Action">
                  {{ item.employee.fullName }}
                </li>
                <li class="flex-item" data-label="Action">
                  {{ item.customer.name }}
                </li>
                <li class="flex-item" data-label="Action">
                  {{ item.totalItem }}
                </li>
                <li class="flex-item" data-label="Action">
                  {{ item.subTotalPrice }}
                </li>
                <li class="flex-item" data-label="Action">
                  {{ item.taxPrice }}
                </li>
                <li class="flex-item" data-label="Action">
                  {{ item.totalPrice }}
                </li>
                <li class="flex-item" data-label="Action">{{ item.date }}</li>

                <li class="flex-item" data-label="Action">
                      <btn-custom 
                  icon="mdi-square-edit-outline"
                  :classProp="`primary mr-4`"
                  v-on:action="edit(item)"
                  type="edit"
                  >
                  </btn-custom>

                  <btn-custom 
                  icon="mdi-file-export-outline"
                  :classProp="`success`"
                  v-on:action="reportTransactionBuy(item.id)"
                  type="export"
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

    <edit-buy
      v-if="orderBuyEdit"
      :transactionData.sync="transactionData"
    ></edit-buy>
  </div>
</template>

<script>
import EditBuyComponent from "./Edit.vue";

import Transaction from "@/store/models/transaction";

import HTTP from "@/services/http";
import Modal from "@/store/models/modal";

export default {
  components: {
    "edit-buy": EditBuyComponent
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

      receptionCustomerBuy: "",

      isMobile: false,
      loadData: false,
      type: "table-tbody"
    };
  },

  mounted() {},

  methods: {
    edit(transactionData) {
      Modal.dispatch("orderBuyEdit", { option: "show" });
      this.transactionData = { ...transactionData };
    },

    nextPage(page) {
      this.currentPage = page;
      this.retrieveData();
    },

    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    async retrieveData() {
      this.loadData = false;
      setTimeout(async () => {
        const res = await Transaction.api().fetchBuyPaging(
          this.currentPage,
          this.itemsPerPage
        );
        if (res.response.status === 200) {
          this.loadData = true;
          Transaction.insert({ data: res.response.data.data });
          this.pageCounts = res.response.data.pageCounts;
        }
      }, 500);
    },

    async reportTransactionBuy(transactionId) {
      var loader = this.$loading.show();
      var res = await HTTP.get("/report/buy", {
        params: {
          transactionId: transactionId
        },

        responseType: "arraybuffer",
        headers: {
          Accept: "application/pdf"
        }
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `report.pdf`;
      link.click();
      loader.hide();
    }
  },

  computed: {
    orderBuyEdit() {
      return Modal.getters("orderBuyEdit");
    },

    transactionBuys() {
      var data = Transaction.query()
        .with("transactionDetailBuys", query => {
          query.with("vehiclePurchase", query => {
            query.with("vehicleRepair");
          });
        })
        .with("employee")
        .with("customer")
        .where("mode", "buy")
        .get();

      data = data.map(item => ({
        ...item,
        totalItem: item.transactionDetailBuys.length
      }));
      return data;
    }
  }
};
</script>
