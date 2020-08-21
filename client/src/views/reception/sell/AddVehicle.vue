<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="receptionSellAddVehicle"
      persistent
      max-width="700"
      v-if="vehicleItem"
    >
      <v-card>
        <v-card-title primary-title>
          Vehicle Info
        </v-card-title>

        <v-card-text class="mt-2">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Name"
                    v-model="vehicleItem.name"
                    :rules="[
                      $validation.required(vehicleItem.name, 'Vehicle name')
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    label="Code"
                    type="text"
                    v-model="vehicleItem.bikeCode"
                    :rules="[
                      $validation.required(vehicleItem.bikeCode, 'Vehicle code')
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    label="Color"
                    v-model="vehicleItem.color"
                    :rules="[
                      $validation.required(vehicleItem.color, 'Vehicle color')
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <vehicle-type
                    :vehicleType.sync="vehicleType"
                    :vehicleTypeRule="vehicleTypeRule"
                  >
                  </vehicle-type>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    label="Registration Plate"
                    v-model="vehicleItem.registrationPlate"
                    :rules="[
                      $validation.required(
                        vehicleItem.registrationPlate,
                        'Registration plate'
                      )
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-select
                    :items="vehicleStatus"
                    label="Bike status"
                    v-model="vehicleItem.bikeStatus"
                    :rules="[
                      $validation.required(
                        vehicleItem.bikeStatus,
                        'Bike status'
                      )
                    ]"
                  ></v-select>
                </v-col>

                <v-col cols="6">
                  <v-file-input
                    label="Image"
                    small-chips
                    show-size
                    accept="image/*"
                    v-model="vehicleItem.image"
                    :rules="[
                      $validation.fileSize(vehicleItem.image, 'Image', 2)
                    ]"
                    @change="previewFile"
                  >
                  </v-file-input>

                  <v-img v-if="loadImage" :src="imageData"></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" outlined text @click="save()">OK</v-btn>
          <v-btn color="blue darken-1" outlined text @click="close()"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import VehicleTest from "@/store/models/vehicle_test";
import Modal from "@/store/models/modal";

// component
import VehicleTypeComponent from "@/components/custom/VehicleType";

export default {
  props: ["vehicleIndex", "vehicleItem"],

  components: {
    "vehicle-type": VehicleTypeComponent
  },

  data() {
    return {
      lazy: false,
      valid: true,

      vehicleStatus: ["waiting", "normal", "new", "old"],

      image: null,
      loadImage: this.vehicleItem.loadImage || false,
      imageData: this.vehicleItem.imageSrc || null,
      vehicleType: this.vehicleItem.vehicleType || null,
      vehicleTypeRule: [
        this.$validation.required(this.vehicleItem.vehicleType, "Vehicle type")
      ]
    };
  },

  mounted() {},

  methods: {
    close() {
      this.$refs.form.resetValidation();
      Modal.dispatch("receptionSellAddVehicle", { option: "hide" });
    },
    save() {
      if (this.$refs.form.validate()) {
        this.vehicleItem.imageSrc = this.imageData;
        this.vehicleItem.vehicleType = this.vehicleType;
        this.vehicleItem.loadImage = this.loadImage;
        var payload = {
          item: this.vehicleItem,
          index: this.vehicleIndex
        };
        VehicleTest.dispatch("add", payload);
        Modal.dispatch("receptionSellAddVehicle", { option: "hide" });
      }
    },

    previewFile() {
      const file = this.vehicleItem.image;
      if (!file) {
        this.imageData = "";
        this.loadImage = false;
        return;
      }

      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          this.loadImage = true;
          this.imageData = reader.result;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  },

  computed: {
    vehicleTypes() {
      return VehicleType.all();
    },

    receptionSellAddVehicle() {
      return Modal.getters("receptionSellAddVehicle");
    }
  }
};
</script>
