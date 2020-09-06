<template>
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
          <sort-item-pagination

             :itemsPerPage.sync="itemsPerPage"
          >
            
          </sort-item-pagination>
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
                  <th>Email</th>
                  <th>Customer phone</th>
                  <th>Require</th>
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

                <tr
                  v-for="(item, index) in receptionCustomerBuys"
                  :key="item.id"
                  v-else
                >
                  <td>
                    {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                  </td>

                  <td>
                    {{ item.salesCustomerBuy.customer.name }}
                  </td>

                  <td>
                    {{ item.salesCustomerBuy.customer.email }}
                  </td>

                  <td>
                    {{ item.salesCustomerBuy.customer.phoneNumber }}
                  </td>

                  <td>
                    {{ item.salesCustomerBuy.customerRequire }}
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
                v-for="(item, index) in receptionCustomerBuys"
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

                    <li class="flex-item" data-label="Email">
                      {{ item.salesCustomerBuy.customer.email }}
                    </li>

                    <li class="flex-item" data-label="Customer phone">
                      {{ item.salesCustomerBuy.customer.phoneNumber }}
                    </li>

                    <li class="flex-item" data-label="Require">
                      {{ item.salesCustomerBuy.customerRequire }}
                    </li>
                    <li class="flex-item" data-label="Progess">
                      <v-chip
                        small
                        :color="
                          $helper.colorStatusTransaction(item.salesCustomerBuy)
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

    <edit
      v-if="receptionBuyEdit"
      :receptionCustomerBuy.sync="receptionCustomerBuy"
    ></edit>
  </v-flex>
</template>

<script>
// component
import EditCustomerBuy from "./Edit.vue";

// store
import ReceptionCustomerBuy from "@/store/models/reception_customer_buy";
import Modal from "@/store/models/modal";
import ComponentStore from "@/store/models/component";

export default {
  components: {
    edit: EditCustomerBuy
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

      search: null,
      receptionCustomerBuy: "",
      isMobile: false,
      loadData: false
    };
  },

  mounted() {

  },

  methods: {
    edit(item) {
      this.receptionCustomerBuy = { ...item };
      Modal.dispatch("receptionBuyEdit", { option: "show" });
    },

    nextPage(page) {
      this.currentPage = page;
      this.retrieveData();
    },

    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },

    changePerPage(){

      // this.retrieveData()
    },

    async retrieveData() {
      this.loadData = false
      setTimeout(async () => {
        const res = await ReceptionCustomerBuy.api().fetchPaging(
          this.currentPage,
          this.itemsPerPage
        );
        if (res.response.status === 200) {
          this.loadData = true;
          ReceptionCustomerBuy.insert({ data: res.response.data.data });
          this.pageCounts = res.response.data.pageCounts
        }
      }, 500)
    }
  },

  computed: {
    receptionCustomerBuys() {
      var itemsPerPage = this.itemsPerPage;
      var offset = this.$helper.calcPagination(this.currentPage, itemsPerPage)

      return ReceptionCustomerBuy.query()
        .with("salesCustomerBuy", query => {
          query.with("customer");
        })
        .offset(offset)
        .limit(itemsPerPage)
        .get();
    },
    receptionBuyEdit() {
      return Modal.getters("receptionBuyEdit");
    }
  }
};
</script>
