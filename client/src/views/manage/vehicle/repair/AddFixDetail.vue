<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="manageVehicleRepairAddFixDetail" persistent max-width="900">
        <v-card>
          <v-card-title class="headline d-flex pb-4">
            Add Fix Detail
          </v-card-title>
          <v-card-text class="mt-4">
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-container>
                <v-row v-if="getVehicleRepair">
                  <v-col cols="12" md="6" sm="6">
                    <v-text-field
                      label="Accessory name"
                      v-model="accessory"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-select
                      :items="employeeTechnicalTests"
                      v-model="employee"
                      item-text="fullName"
                      return-object
                      label="Technical test"
                    ></v-select>
                  </v-col>

                  <v-col cols="12" md="6" sm="6">
                    <v-menu
                      :close-on-content-click="true"
                      ref="menu1"
                      v-model="menu1"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="formatStartDate"
                          label="Date"
                          hint="MM/DD/YYYY format"
                          persistent-hint
                          prepend-icon="event"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row class="d-flex" align="center"> </v-row>
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
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
// store
import VehicleRepair from "@/store/models/vehicle_repair";
import Employee from "@/store/models/employee";
import TechnicalRepair from "@/store/models/technical_repair";
import Modal from "@/store/models/modal";
export default {
  props: ["vehicleRepairId"],

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
      employeeTechnicalTests: null,
      date: "",
      menu1: false,
      accessory: null,
      employee: null
    };
  },

  mounted() {
    this.retrieveEmployeeTechnicalTests();
  },

  methods: {
    async retrieveEmployeeTechnicalTests() {
      const res = await Employee.api().getByPostion(2);
      if (res.response.status === 200) {
        this.employeeTechnicalTests = res.response.data.data;
      }
    },

    async save() {
      var vm = this;
      if (vm.$refs.form.validate()) {
        var dataStore = {
          accessory: vm.accessory,
          employeeId: vm.employee.id,
          startDate: vm.$helper.parseDate(vm.formatStartDate),
          type: 1,
          vehicleRepairId: vm.vehicleRepairId
        };
        const res = await TechnicalRepair.api().create(dataStore);
        if (res.response.status === 200) {
          TechnicalRepair.insert({ data: res.response.data.data });
          toastr.success(res.response.data.message, "Success!", {
            timeOut: 1000
          });
          vm.$emit("update:dialogAddFixDetail", false);
        }
      }
    },

    close() {
      Modal.dispatch("manageVehicleRepairAddFixDetail", { option: "hide" });
    }
  },

  computed: {
    getVehicleRepair() {
      return VehicleRepair.query()
        .where("id", this.vehicleRepairId)
        .get();
    },

    formatStartDate() {
      return this.$helper.formatDate(this.date);
    },

    manageVehicleRepairAddFixDetail() {
      return Modal.getters("manageVehicleRepairAddFixDetail");
    }
  }
};
</script>
