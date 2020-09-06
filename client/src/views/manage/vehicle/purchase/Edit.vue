<template>
  <div>
    <v-layout row justify-center>
      <v-dialog
        v-model="manageVehiclePurchaseEdit"
        persistent
        max-width="900"
        v-if="getVehiclePurchase"
      >
        <v-card>
          <v-card-title class="headline d-flex pb-4">
            Edit Customer Buy
          </v-card-title>
          <v-card-text class="mt-4">
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-container>
                <v-row v-if="getVehiclePurchase">
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Customer name"
                      v-model="getVehiclePurchase.name"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Color"
                      v-model="getVehiclePurchase.color"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Registration Plate"
                      type="text"
                      v-model="getVehiclePurchase.registrationPlate"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Status"
                      type="text"
                      v-model="getVehiclePurchase.status"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Price"
                      type="text"
                      v-model="getVehiclePurchase.price"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                    sm="6"
                    v-if="getVehiclePurchase.image"
                  >
                    <v-img
                      contain
                      :src="getVehiclePurchase.image"
                    ></v-img>
                  </v-col>
                </v-row>

                <v-row class="d-flex" align="center"> </v-row>
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
// store
import VehicleRepair from "@/store/models/vehicle_repair";
import VehiclePurchase from "@/store/models/vehicle_purchase";
import Modal from "@/store/models/modal";

export default {
  props: ["dialogEdit", "vehiclePurchase"],

  data() {
    return {
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
      getVehiclePurchase: this.vehiclePurchase
    };
  },

  mounted() {},

  methods: {
    close() {
      Modal.dispatch("manageVehiclePurchaseEdit", { option: "hide" });
    },

    async save() {
      if (this.$refs.form.validate()) {
        const vehiclePurchaseUpdate = await VehiclePurchase.api().update(
          this.getVehiclePurchase.id,
          this.getVehiclePurchase
        );
        VehiclePurchase.update({
          data: vehiclePurchaseUpdate.response.data.data
        });

        if (
          vehiclePurchaseUpdate.response.status === 200 &&
          this.checkVehicleRepairExist()
        ) {
          toastr.success("<p>Update success!</p>", "Success", {
            timeOut: 500
          });
           Modal.dispatch("manageVehiclePurchaseEdit", { option: "hide" });
        }

        if (!this.checkVehicleRepairExist()) {
          var dataVehicleRepairStore = {
            vehiclePurchaseId: this.getVehiclePurchase.id,
            approveFlg: this.vehicleRepair.approveFlg === true ? 1 : 0,
            note: "Oke",
            startDate: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          };

          const res = await VehicleRepair.api().create(dataVehicleRepairStore);
          if (res.response.status === 200) {
            await VehicleRepair.insert({ data: res.response.data.data });
            toastr.success("<p>Change success!</p>", "Success", {
              timeOut: 500
            });
              Modal.dispatch("manageVehiclePurchaseEdit", { option: "hide" });
          }
        }
      }
    },

    checkVehicleRepairExist() {
      return VehicleRepair.query()
        .where("vehiclePurchaseId", this.getVehiclePurchase.id)
        .exists();
    },

  },

  computed: {
    vehicleRepair: {
      get() {
        if (!this.getVehiclePurchase.vehicleRepair) {
          return Object.create(null);
        } else {
          return this.getVehiclePurchase.vehicleRepair;
        }
      }
    },

    approveFlg: {
      set(val) {
        if (this.vehicleRepair) this.vehicleRepair.approveFlg = val;
      },

      get() {
        if (Object.entries(this.vehicleRepair).length === 0) {
          return false;
        } else {
          if (this.vehicleRepair.approveFlg === 1) {
            return true;
          }
          return false;
        }
      }
    },

    manageVehiclePurchaseEdit() {
      return Modal.getters("manageVehiclePurchaseEdit");
    }
  }
};
</script>
