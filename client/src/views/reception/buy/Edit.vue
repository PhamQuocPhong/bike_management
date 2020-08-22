<template>
  <div>
    <v-layout row justify-center>
      <v-dialog
        v-model="receptionBuyEdit"
        persistent
        max-width="900"
        v-if="receptionCustomerBuy"
      >
        <v-card>
          <v-card-title class="headline d-flex pb-4 ">
            Edit Customer Buy
          </v-card-title>

          <v-card-text class="mt-4">
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-container>
                <v-row v-if="receptionCustomerBuy">
                  <v-col cols="6">
                    <v-text-field
                      label="Customer name"
                      v-model="customer.name"
                      :rules="[
                        $validation.required(customer.name, 'Customer name')
                      ]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Customer phone"
                      type="text"
                      v-model="customer.phoneNumber"
                      :rules="[
                        $validation.required(
                          customer.phoneNumber,
                          'Phone number'
                        )
                      ]"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Customer address"
                      type="text"
                      v-model="customer.address"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-textarea
                    label="Require"
                    rows="5"
                    :filled="true"
                    :solo="true"
                    :noResize="true"
                    v-model="customer.Require"
                  >
                  </v-textarea>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <btn-custom 
              :outlined="true"
              title="Save"
              v-on:action="save()"
              color="blue darken-1"
              type="save"
            >
            </btn-custom>

            <btn-custom 
              :outlined="true"
              title="Close"
              v-on:action="close()"
              color="blue darken-1"
              type="close"
            >
            </btn-custom>


          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import ReceptionCustomerBuy from "@/store/models/reception_customer_buy";
import VehicleType from "@/store/models/vehicle_type";
import Modal from "@/store/models/modal";

export default {
  props: ["receptionCustomerBuy"],

  data() {
    return {
      right: 10,
      top: 10,
      valid: true,
      lazy: false,
      // rule form
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      itemsPerPageList: [5, 10, 15],
      dialogVehicleTest: false,
      role: "reception",
      getReceptionCustomerBuy: null
    };
  },

  methods: {
    close() {
      Modal.dispatch("receptionBuyEdit", { option: "hide" });
    },

    async save() {
      if (this.$refs.form.validate()) {
        var data = this.receptionCustomerBuy;
        var id = data.id;
        const res = await ReceptionCustomerBuy.api().update(id, data);

        if (res.response.status === 200) {
          ReceptionCustomerBuy.update({
            id: res.response.data.id,
            data: res.response.data.data
          });
          toastr.success(res.response.data.message, "Success!", {
            timeOut: 1000
          });
          Modal.dispatch("receptionBuyEdit", { option: "hide" });
        }
      } else {
      }
    }
  },

  computed: {
    vehicleTypes() {
      return VehicleType.all();
    },

    customer() {
      return this.receptionCustomerBuy.salesCustomerBuy.customer;
    },
    receptionBuyEdit() {
      return Modal.getters("receptionBuyEdit");
    }
  }
};
</script>
