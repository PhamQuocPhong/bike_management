<template>
  <v-layout row justify-center>
    <v-dialog v-model="salesTransaction" persistent max-width="1000">
      <v-card>
        <v-card-title class="headline d-flex pb-4">
          Customer Transaction
        </v-card-title>
        <v-card-text class="mt-4">
          <v-container>
            <v-row>
              <v-col cols="6">
                <p>Hình thức thanh toán</p>
              </v-col>

              <v-col cols="6">
                <div class="d-flex">
                  <label>Customer name:</label>
                  <p class="pl-4 font-weight-bold">{{ customerInfo.name }}</p>
                </div>

                <div class="d-flex">
                  <label>Customer phone:</label>
                  <p class="pl-4 font-weight-bold">
                    {{ customerInfo.phoneNumber }}
                  </p>
                </div>
              </v-col>
            </v-row>

            <v-subheader>Subheader</v-subheader>

            <v-data-table
              :headers="headers"
              :items="getVehiclesTransaction"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              hide-default-footer
              class="elevation-1"
              @page-count="pageCount = $event"
            >
              <template v-slot:item.no="{ item }">
                {{ $helper.indexColumn(item, getVehiclesTransaction) }}
              </template>

              <template v-slot:item.action="{ item }">
                <v-btn color="white" small class="primary mr-4" @click="edit()"
                  >View</v-btn
                >
                <v-btn color="white" small class="warning">Cancel</v-btn>
              </template>

              <template v-slot:item.name="{ item }">
                {{ item.vehicle.name }}
              </template>

              <template v-slot:item.image="{ item }">
                <v-img
                  :src="item.vehicle.image"
                  contain
                  width="100"
                  height="50"
                >
                </v-img>
              </template>

              <template v-slot:item.color="{ item }">
                {{ item.vehicle.color }}
              </template>

              <template v-slot:item.quantity="{ item }">
                {{ item.quantity }}
              </template>

              <template v-slot:item.price="{ item }">
                {{ item.unitPrice | toCurrency }}
              </template>

              <template v-slot:item.totalPrice="{ item }">
                {{ item.totalPrice | toCurrency }}
              </template>
            </v-data-table>

            <v-card>
              <div class="col col-12">
                <p class="subtitle-2 text-right font-weight-bold">
                  Sub total:
                  <span class="orange--text">
                    {{ subTotalPrice | toCurrency }} $
                  </span>
                </p>
                <p class="subtitle-2 text-right font-weight-bold">
                  Tax price:
                  <span class="orange--text">
                    {{ taxPrice | toCurrency }} $
                  </span>
                </p>
                <p class="title text-right font-weight-bold">
                  Total price:
                  <span class="orange--text">
                    {{ finalTotalPrice | toCurrency }} $
                  </span>
                </p>
              </div>
            </v-card>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined text @click.native="payment()"
            >Payment</v-btn
          >
          <v-btn color="blue darken-1" outlined text @click.native="close"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <confirm-dialog
      :returnConfirm.sync="returnConfirm"
      :showConfirm.sync="showConfirm"
      title="Confirm Payment"
      content="🔥 Will this payment be made as soon as you agree? Are you sure?"
    >
    </confirm-dialog>
  </v-layout>
</template>

<script>
import SalesCustomerBuy from "@/store/models/sales_customer_buy";
import Transaction from "@/store/models/transaction";
import Modal from "@/store/models/modal";

export default {
  props: ["transactionDialog", "vehiclesTransaction", "infoTransaction"],

  data() {
    return {
      valid: true,
      lazy: false,
      headers: [
        { text: "No.", value: "no", width: 70 },
        { text: "Vehicle name", value: "name", width: 150 },
        { text: "Image", value: "image", width: 80 },
        { text: "Color", value: "color", width: 150 },
        { text: "Quantity", value: "quantity", width: 100 },
        { text: "Price", value: "price", width: 120 },
        { text: "Total price", value: "totalPrice", width: 100 }
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      itemsPerPageList: [5, 10, 15],
      transactionDetailSell: null,
      showConfirm: false,
      returnConfirm: false
    };
  },

  mounted() {},

  methods: {
    close() {
      Modal.dispatch("salesTransaction", { option: "hide" });
    },

    async payment() {
      this.showConfirm = true;
      this.returnConfirm = false;
    },

    async savePayment() {
      var dataTransaction = {
        taxPrice: this.taxPrice,
        subTotalPrice: this.subTotalPrice,
        totalPrice: this.finalTotalPrice,
        date: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        mode: "sell",
        employeeId: this.employeeInfo.id,
        customerId: this.customerInfo.id
      };

      var data = {
        transaction: dataTransaction,
        infoTransaction: this.infoTransaction,
        transactionDetailData: this.getVehiclesTransaction
      };

      var res = await Transaction.api().create(data);
      if (res.response.status === 200) {
        SalesCustomerBuy.update({
          where: res.response.data.data.id,
          data: res.response.data.data
        });

        this.$toastr.success(res.response.data.message, "Success!", {
          timeOut: 1000
        });
        Modal.dispatch("salesTransaction", { option: "hide" });
      }
    },

    calcTotalPrice() {
      return this.getVehiclesTransaction.reduce((acc, obj) => {
        return this.$helper.defaultNumber(acc + obj.vehicle);
      }, 0);
    }
  },

  watch: {
    returnConfirm(val) {
      if (val === true) {
        this.savePayment();
      }
    }
  },

  computed: {
    getVehiclesTransaction: {
      get() {
        return this.vehiclesTransaction.map(obj => ({
          ...obj,
          totalPrice: obj.vehicle.price * 1,
          quantity: 1,
          unitPrice: obj.vehicle.price
        }));
      },
      set(data) {
        this.vehiclesTransaction = data;
      }
    },

    finalTotalPrice() {
      return this.subTotalPrice + this.taxPrice;
    },

    subTotalPrice() {
      return this.getVehiclesTransaction.reduce((acc, obj) => {
        return acc + obj.totalPrice;
      }, 0);
    },
    taxPrice() {
      return this.subTotalPrice * 0.1;
    },

    customerInfo() {
      return this.infoTransaction.customer;
    },

    employeeInfo() {
      return this.$cookies.get("dataUser").employee;
    },

    salesTransaction() {
      return Modal.getters("salesTransaction");
    }
  }
};
</script>
