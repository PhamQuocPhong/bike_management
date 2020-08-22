<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="manageVehicleRepairEdit"
      persistent
      max-width="900"
      v-if="getVehicleRepair"
    >
      <v-card>
        <v-card-title class="headline d-flex pb-4">
          Edit Vehicle Repair
        </v-card-title>
        <v-card-text class="mt-4">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-container>
              <v-row v-if="getVehicleRepair">
                <v-col cols="12" md="6" sm="6">
                  <v-text-field
                    label="Vehicle purchase name"
                    v-model="getVehicleRepair.vehiclePurchase.name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <v-text-field
                    label="Note"
                    v-model="getVehicleRepair.note"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <v-text-field
                    label="Total fix price"
                    v-model.number="getVehicleRepair.fixPrice"
                    type="number"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <v-text-field
                    label="Price"
                    v-model.number="getVehicleRepair.price"
                    type="number"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <v-menu
                    ref="startDate1"
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="formatStartDate"
                        label="Start date"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="event"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="getVehicleRepair.startDate"
                      no-title
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <v-menu
                    ref="startDate2"
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="formatEndDate"
                        label="End date"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="event"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="getVehicleRepair.endDate"
                      no-title
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <v-switch label="Approve Fixed" v-model="approveFlg">
                  </v-switch>
                </v-col>

                <v-col cols="12" md="6" sm="6">
                  <v-card flat tile>
                    <v-img
                      aspect-ratio="2"
                      :src="getVehicleRepair.vehiclePurchase.image"
                      ratio="16/9"
                      contain
                    >
                      <div class="fill-height bottom-gradient"></div>
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" class="d-flex align-center">
                  <v-subheader class="font-weight-bold"
                    >Planning fixing list</v-subheader
                  >
                  <v-spacer></v-spacer>
                  <v-btn color="success" small @click="addFixDetail()">
                    Add Fix Detail</v-btn
                  >
                </v-col>

                <v-col cols="12">
                  <v-list two-line>
                    <v-list-item-group active-class="yellow--text">
                      <template v-for="(item, index) in getTechnicalRepairs">
                        <v-list-item :key="item.id">
                          <template v-slot:default="{ active }">
                            <v-list-item-content>
                              <v-list-item-title
                                class="font-weight-bold"
                                v-text="item.accessory"
                              ></v-list-item-title>
                              <v-list-item-subtitle
                                class="red--text text--lighten-1 font-italic pt-2 pb-2"
                                v-text="item.employee.fullName"
                              ></v-list-item-subtitle>
                              <v-list-item-subtitle
                                >{{ item.startDate }} ->
                                {{ item.endDate }}</v-list-item-subtitle
                              >
                            </v-list-item-content>

                            <v-list-item-action class="justify-center">
                              <v-list-item-action-text
                                v-text="item.action"
                              ></v-list-item-action-text>
                              <v-icon v-if="item.finishFlg == 1" color="green">
                                mdi-check-circle
                              </v-icon>

                              <v-icon v-else color="grey lighten-1">
                                mdi-check-circle
                              </v-icon>
                            </v-list-item-action>
                          </template>
                        </v-list-item>

                        <v-divider
                          v-if="index + 1 < getTechnicalRepairs.length"
                        ></v-divider>
                      </template>
                    </v-list-item-group>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined text @click="save()">
            Save
          </v-btn>
          <v-btn color="blue darken-1" outlined text @click="close()">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>

      <add-fix-detail
        v-if="manageVehicleRepairAddFixDetail"
        :dialogAddFixDetail.sync="dialogAddFixDetail"
        :vehicleRepairId.sync="getVehicleRepair.id"
      ></add-fix-detail>
    </v-dialog>
  </v-layout>
</template>

<style scoped>
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}

.repeating-gradient {
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(255, 0, 0, 0.25),
    rgba(255, 0, 0, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 5px,
    rgba(0, 0, 255, 0.25) 10px
  );
}
</style>

<script>
// component
import AddFixDetail from "./AddFixDetail";

// store
import VehicleRepair from "@/store/models/vehicle_repair";
import TechnicalRepair from "@/store/models/technical_repair";
import Modal from "@/store/models/modal";

export default {
  components: {
    "add-fix-detail": AddFixDetail
  },

  props: ["editDialog", "vehicleRepair"],

  async created() {
    const res = await TechnicalRepair.api().fetchByVehicleRepairId(
      this.vehicleRepair.id
    );
    TechnicalRepair.insert({ data: res.response.data.data });
  },

  data() {
    return {
      right: 10,
      top: 10,
      valid: true,
      lazy: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      itemsPerPageList: [5, 10, 15],
      dialogAddFixDetail: false,
      role: "reception",
      getVehicleRepair: this.vehicleRepair,
      dateFormatted: this.$helper.formatDate(
        new Date().toISOString().substr(0, 10)
      )
    };
  },

  mounted() {},

  methods: {

    close() {
      Modal.dispatch("manageVehicleRepairEdit", { option: "hide" });
    },

    async save() {
      var vm = this;
      if (vm.$refs.form.validate()) {
        const data = vm.getVehicleRepair;
        const vehicleRepairId = vm.getVehicleRepair.id;
        const res = await VehicleRepair.api().update(vehicleRepairId, data);
        if (res.response.status === 200) {
          VehicleRepair.update({
            where: vehicleRepairId,
            data: res.response.data.data
          });
          toastr.success(res.response.data.message, "Success!", {
            timeOut: 1000
          });
          Modal.dispatch("manageVehicleRepairEdit", { option: "hide" });
        }
      } else {
      }
    },

    addFixDetail() {
      Modal.dispatch("manageVehicleRepairAddFixDetail", { option: "show" });

    }
  },

  computed: {
    getTechnicalRepairs() {
      return TechnicalRepair.query()
        .with("employee")
        .where("vehicleRepairId", this.getVehicleRepair.id)
        .get();
    },

    formatStartDate() {
      return this.$helper.formatDate(this.getVehicleRepair.startDate);
    },
    formatEndDate() {
      return this.$helper.formatDate(this.getVehicleRepair.endDate);
    },

    approveFlg: {
      get() {
        return this.getVehicleRepair.approveFlg;
      },

      set(val) {
        return (this.getVehicleRepair.approveFlg = val === true ? 1 : 0);
      }
    },

    manageVehicleRepairEdit() {
      return Modal.getters("manageVehicleRepairEdit");
    },

    manageVehicleRepairAddFixDetail() {
      return Modal.getters("manageVehicleRepairAddFixDetail");
    }
  }
};
</script>
