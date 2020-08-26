<template>
  <v-layout row justify-center v-resize="onResize">
    <v-dialog v-model="technicalRepairEdit" persistent max-width="700">
      <v-card>
        <v-card-title class="headline d-flex pb-4">
          Technical Repair Edit
        </v-card-title>

        <v-card-text :class="{ 'mt-4': !isMobile }">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-row>
              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="getTechnicalRepair.accessory"
                  label="Accessory"
                  regular
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  v-model="getTechnicalRepair.price"
                  label="Price"
                  regular
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
                      label="Date"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="event"
                      @blur="
                        getTechnicalRepair.startDate = $helper.parseDate(
                          dateFormatted
                        )
                      "
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getTechnicalRepair.startDate"
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
                      label="Date"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="event"
                      @blur="
                        getTechnicalRepair.endDate = $helper.parseDate(
                          dateFormatted
                        )
                      "
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="getTechnicalRepair.endDate"
                    no-title
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" md="2" sm="2">
                <v-checkbox label="Finished" v-model="finishFlag"></v-checkbox>
              </v-col>
            </v-row>
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
</template>

<script>
// mixin
import IsMobile from "@/mixin/is_mobile";

// store
import Modal from "@/store/models/modal";
import TechnicalRepair from "@/store/models/technical_repair";

export default {
  props: ["technicalRepair"],

  mixins: [IsMobile],

  data() {
    return {
      valid: true,
      lazy: false,
      getTechnicalRepair: this.technicalRepair,
      dateFormatted: this.$helper.formatDate(
        new Date().toISOString().substr(0, 10)
      )
    };
  },

  mounted() {},

  methods: {
    close() {
      Modal.dispatch("technicalRepairEdit", { option: "hide" });
    },
    async save() {
      if (this.$refs.form.validate()) {
        const res = await TechnicalRepair.api().update(
          this.getTechnicalRepair.id,
          this.getTechnicalRepair
        );
        if (res.response.status === 200) {
          TechnicalRepair.update({
            where: this.getTechnicalRepair.id,
            data: res.response.data.data
          });
          toastr.success(res.response.data.message, "Success!", {
            timeOut: 1000
          });
          Modal.dispatch("technicalRepairEdit", { option: "hide" });
        }
      }
    }
  },

  computed: {
    statusBikes() {
      return this.$enum.progressVehicleBuy.list;
    },

    formatStartDate() {
      return this.$helper.formatDate(this.getTechnicalRepair.startDate);
    },
    formatEndDate() {
      return this.$helper.formatDate(this.getTechnicalRepair.endDate);
    },

    finishFlag: {
      get() {
        return this.getTechnicalRepair.finishFlg;
      },
      set(val) {
        this.getTechnicalRepair.finishFlg = val === true ? 1 : 0;
      }
    },

    technicalRepairEdit() {
      return Modal.getters("technicalRepairEdit");
    }
  }
};
</script>
