<template>
  <div>
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
                 <skeleton-custom></skeleton-custom>
                </td>
              </tr>

              <tr v-for="item in transactionSells" :key="item.id" v-else>
                <td>
                  {{ $helper.indexColumn(item, transactionSells) }}
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
                    v-on:action="reportTransactionSell(item.id)"
                    type="export"
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
              v-for="(item, index) in transactionSells"
              :key="item.id"
              v-if="loadData"
            >
              <td>
                <ul class="flex-content">
                  <li class="flex-item" data-label="Action">
                    {{ $helper.indexColumn(item, transactionSells) }}
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
                    v-on:action="reportTransactionSell(item.id)"
                    type="export"
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

    <edit-sell
      v-if="orderSellEdit"
      :transactionData.sync="transactionData"
    ></edit-sell>
  </div>
</template>

<script>
// component
import EditSellComponent from "./Edit.vue";
import ComponentStore from "@/store/models/component";

// store
import Transaction from "@/store/models/transaction";
import Modal from "@/store/models/modal";
import HTTP from "@/services/http";

export default {
  components: {
    "edit-sell": EditSellComponent
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
      isMobile: false,
      loadData: false,
      
    };
  },

  mounted() {},

  methods: {
    edit(transactionData) {
      Modal.dispatch("orderSellEdit", { option: "show" });
      this.transactionData = { ...transactionData };
    },

    nextPage(page) {
      this.currentPage = page;
      this.loadData = false;
      this.retrieveData();
    },

    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    async retrieveData() {
      this.loadData = false;
      setTimeout(async () => {
        const res = await Transaction.api().fetchSellPaging(
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

    async reportTransactionSell(transactionId) {
      var loader = this.$loading.show();
      var res = await HTTP.get("/report/sell", {
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
    orderSellEdit() {
      return Modal.getters("orderSellEdit");
    },

    transactionSells() {
      var itemsPerPage = this.itemsPerPage;
      var offset = this.$helper.calcPagination(this.currentPage, itemsPerPage)

      var data = Transaction.query()
        .with("transactionDetailSells", query => {
          query.with("vehicle");
        })
        .with("employee")
        .with("customer")
        .where("mode", "sell")
        .get();
      data = data.map(item => ({
        ...item,
        totalItem: this.$helper.totalItem(
          item.transactionDetailSells,
          "quantity"
        )
      }));
      return data;
    }
  }
};
</script>
