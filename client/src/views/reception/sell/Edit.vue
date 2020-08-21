<template>
  <div>
    <v-layout row justify-center>
      <v-dialog
        v-model="receptionSellEdit"
        persistent
        max-width="900"
        v-if="receptionCustomerSell"
      >
        <v-card>
          <v-card-title class="headline d-flex pb-4">
            ReceptionDeal
          </v-card-title>

          <v-card-text class="mt-4">
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-container>
                <v-row v-if="receptionCustomerSell.customer">
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Customer name"
                      v-model="receptionCustomerSell.customer.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Customer phone"
                      type="text"
                      v-model="receptionCustomerSell.customer.phoneNumber"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Customer address"
                      type="text"
                      v-model="receptionCustomerSell.customer.address"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-data-table
                  :headers="headers"
                  :items="vehicleTests"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  hide-default-footer
                  class="elevation-1"
                  @page-count="pageCount = $event"
                >
                  <template v-slot:item.no="{ item }">
                    <v-checkbox
                      color="primary"
                      :value="true"
                      hide-details
                      :disabled="
                        item.bikeStatus == null ||
                          receptionCustomerSell.status == 'completed'
                      "
                      class="mt-0"
                      v-model="item.selected"
                    ></v-checkbox>
                  </template>

                  <template v-slot:item.action="{ item }">
                    <v-btn
                      color="white"
                      small
                      class="primary mr-4"
                      @click="edit(item)"
                      :disabled="receptionCustomerSell.status == 'completed'"
                    >
                      View
                    </v-btn>
                  </template>

                  <template v-slot:item.registrationPlate="{ item }">
                    {{ item.registrationPlate }}
                  </template>

                  <template v-slot:item.bikeCode="{ item }">
                    {{ item.bikeCode }}
                  </template>

                  <template v-slot:item.bikeStatus="{ item }">
                    <v-chip
                      :color="$helper.colorStatusBike(item.bikeStatus)"
                      class="justify-center status-bike"
                      small
                      dark
                    >
                      {{ item.bikeStatus }}
                    </v-chip>
                  </template>

                  <template v-slot:item.rangePrice="{ item }">
                    <div v-if="item.minPrice">
                      {{ item.minPrice }} - {{ item.maxPrice }} $
                    </div>
                  </template>
                </v-data-table>

                <v-row class="mt-4">
                  <v-col cols="12">
                    <p class="title text-right font-weight-bold">
                      Total: <span class="orange--text"> 2.000$ </span>
                    </p>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn
              v-if="receptionCustomerSell.status == 'confirm'"
              color="blue darken-1"
              text
              @click="transaction()"
            >
              Transaction</v-btn
            >
            <v-tooltip
              top
              v-else-if="receptionCustomerSell.status == 'completed'"
            >
              <template v-slot:activator="{ on }">
                <v-btn color="blue darken-1" text dark v-on="on">
                  <v-icon>
                    mdi-check-circle
                  </v-icon>
                  Transaction
                </v-btn>
              </template>
              <span>Completed transaction</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" outlined text @click="save()"
              >Save</v-btn
            >
            <v-btn color="blue darken-1" outlined text @click="close()"
              >Close</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <transaction
      v-if="receptionSellTransaction"
      :getReceptionCustomerSell.sync="getReceptionCustomerSell"
    ></transaction>
    <!--   <vehicle-test v-if="dialogVehicleTest" :role="role" :dialogVehicleTest.sync="dialogVehicleTest" :vehicleTest.sync="vehicleTest"></vehicle-test> -->
  </div>
</template>

<script>
// component
import VehicleTestComponent from "@/views/technical/test/VehicleTest.vue";
import TransactionComponent from "./Transaction";

// store
import Modal from "@/store/models/modal";
import VehicleType from "@/store/models/vehicle_type";

// mixin
import isMobile from "@/mixin/is_mobile";

export default {
  mixins: [isMobile],

  props: ["receptionCustomerSell"],
  components: {
    transaction: TransactionComponent,
    "vehicle-test": VehicleTestComponent
  },

  data() {
    return {
      valid: true,
      lazy: false,
      vehicleTest: null,

      headers: [
        { text: "No.", value: "no", width: 70 },
        { text: "Registration plate", value: "registrationPlate", width: 200 },
        { text: "Bike code", value: "bikeCode", width: 200 },
        { text: "Bike status", value: "bikeStatus", width: 200 },
        { text: "Range Price", value: "rangePrice", width: 200 },
        { text: "Action", align: "center", value: "action", width: 120 }
      ],

      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      itemsPerPageList: [5, 10, 15],
      getdialogDeal: this.dialogDeal,
      dialogVehicleTest: false,
      role: "reception",
      getReceptionCustomerSell: null,

      // modal
      receptionSellEdit: Modal.getters("receptionSellEdit")
    };
  },

  methods: {
    close() {
      Modal.dispatch("receptionSellEdit", { option: "hide" });
    },

    save() {
      if (this.$refs.form.validate()) {
      }
    },

    async transaction() {
      var vehicleTestSelected = this.vehicleTests.filter(
        item => item.selected === true
      );
      if (vehicleTestSelected.length <= 0) {
        this.$toastr.warning("Please choose vehicle to payment", "Warning!", {
          timeOut: 1000
        });
        return;
      }

      this.getReceptionCustomerSell = { ...this.receptionCustomerSell };
      this.getReceptionCustomerSell.vehicleTests = vehicleTestSelected;
      Modal.dispatch("receptionSellTransaction", { option: "show" });
    },

    edit(item) {
      this.dialogVehicleTest = true;
      this.vehicleTest = { ...item };
    }
  },

  watch: {
    receptionSellTransaction(val) {
      this.receptionSellEdit = !val;
    }
  },

  computed: {
    vehicleTypes() {
      return VehicleType.all();
    },

    vehicleTests: {
      set(data) {
        this.receptionCustomerSell.vehicleTests = data;
      },
      get() {
        return this.receptionCustomerSell.vehicleTests;
      }
    },

    rangePrice: {
      get: function() {
        return (
          this.$helper.defaultNumber(this.vehicleTest.minPrice) +
          " - " +
          this.$helper.defaultNumber(this.vehicleTest.maxPrice)
        );
      },
      set: function(newVal) {
        this.vehicleTest.minPrice = newVal.split("-")[0].trim();
        this.vehicleTest.maxPrice = newVal.split("-")[1].trim();
      }
    },

    receptionSellTransaction() {
      return Modal.getters("receptionSellTransaction");
    }
  }
};
</script>
