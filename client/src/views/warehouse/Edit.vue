<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="warehouseEdit" persistent max-width="900">
        <v-card>
          <v-card-title class="headline d-flex pb-4 border-bottom">
            Create
          </v-card-title>

          <v-card-text class="mt-4">
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-container>
                <v-row v-if="newVehicle">
                  <v-col md="6" sm="6" cols="12">
                    <v-text-field
                      label="Name"
                      v-model="newVehicle.name"
                    ></v-text-field>
                  </v-col>
                  <v-col md="6" sm="6" cols="12">
                    <v-select
                      :items="vehicleTypes"
                      v-model="newVehicle.vehicleType"
                      label="Type"
                      item-text="name"
                      return-object
                    ></v-select>
                  </v-col>

                  <v-col md="6" sm="6" cols="12">
                    <v-text-field
                      label="Color"
                      type="text"
                      v-model="newVehicle.color"
                    ></v-text-field>
                  </v-col>

                  <v-col md="6" sm="6" cols="12">
                    <v-text-field
                      label="Registration plate"
                      type="text"
                      v-model="newVehicle.registrationPlate"
                    ></v-text-field>
                  </v-col>

                  <v-col md="6" sm="6" cols="12">
                    <v-text-field
                      label="Buy price"
                      type="number"
                      v-model="newVehicle.buyPrice"
                    ></v-text-field>
                  </v-col>

                  <v-col md="6" sm="6" cols="12">
                    <v-text-field
                      label="Price"
                      type="number"
                      v-model="newVehicle.price"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <upload :image.sync="image"></upload>
                  </v-col>
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
import VehicleType from "@/store/models/vehicle_type";
import Vehicle from "@/store/models/vehicle";
import Modal from "@/store/models/modal";

import UploadFileComponent from "@/components/custom/DropZone.vue";

export default {
  props: ["createDialog"],

  components: {
    upload: UploadFileComponent
  },

  created() {},

  data() {
    return {
      valid: true,
      lazy: false,
      image: null
    };
  },

  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        if (this.image) {
          this.newVehicle.image = this.image.dataURL;
        }
        this.newVehicle.vehicleTypeId = this.newVehicle.vehicleType.id;
        const res = await Vehicle.api().create(this.newVehicle);
        console.log(res);
      }
    },

    close() {
      Modal.dispatch("warehouseEdit", { option: "hide" });
    }
  },

  computed: {
    newVehicle() {
      return new Vehicle();
    },

    vehicleTypes() {
      return VehicleType.all();
    },

    warehouseEdit() {
      return Modal.getters("warehouseEdit");
    }
  }
};
</script>
