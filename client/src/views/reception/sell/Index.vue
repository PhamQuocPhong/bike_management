<template>
  <div id="reception">
    <v-container>
      <label-table title="Reception sell"> </label-table>

      <v-flex xs12 md6 class="mt-6 mx-auto mb-8">
        <v-card :class="{ 'pa-4': !isMobile }" :flat="isMobile">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy" md6>
            <v-row>
              <v-flex>
                <p class="text-center title">Customer Info</p>
              </v-flex>
            </v-row>
            <v-row>
              <v-col cols="12" md="12" sm="6">
                <v-text-field
                  v-model="newCustomer.name"
                  :rules="[
                    $validation.required(
                      newCustomer.phoneNumber,
                      'Customer name'
                    )
                  ]"
                  label="Full Name"
                  required
                ></v-text-field>
              </v-col>


              <v-col cols="12" md="12" sm="6">
                <v-text-field
                  v-model="newCustomer.phoneNumber"
                  :counter="10"
                  :rules="[
                    $validation.required(
                      newCustomer.phoneNumber,
                      'Phone number'
                    ),
                    $validation.phoneNumber(newCustomer.phoneNumber)
                  ]"
                  label="Phone Number"
                  required
                ></v-text-field>
              </v-col>


              <v-col cols="12" md="12" sm="6">
                <v-text-field
                  v-model="newCustomer.email"
                  :rules="[
                    $validation.required(newCustomer.email, 'Email'),
                    $validation.email(newCustomer.email)
                  ]"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>


              <v-col cols="12" md="12" sm="6">
                <v-text-field
                  v-model="newCustomer.address"
                  label="Address"
                  required
                ></v-text-field>
              </v-col>


              <v-col cols="12" md="12" sm="6">
                <employee-dropdown
                  :employee.sync="employeeTest"
                  :positionId.sync="technicalTestPosition"
                  label="Technical test"
                  :employeeRules="[
                    $validation.required(
                      technicalTestPosition,
                      'Technical test'
                    )
                  ]"
                >
                </employee-dropdown>
              </v-col>
            </v-row>

            <v-row class="mb-6" v-if="vehicleTestArray.length">
              <v-col
                cols="12"
                sm="12"
                md="6"
                :key="index"
                v-for="(item, index) in vehicleTestArray"
              >
                <v-hover v-slot:default="{ hover }" open-delay="200">
                  <v-card
                    :elevation="hover ? 12 : 2"
                    :class="{ 'on-hover': hover }"
                    max-width="400"
                  >
                    <v-card-title>
                      <v-icon normal left :color="colorInfo(item)">
                        {{ $helper.showVehicleType(item.vehicleType) }}
                      </v-icon>
                      <span class="subtitle-1 font-weight-light">Vehicle </span>
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-text class="headline font-weight-bold text-center">
                      View Info
                    </v-card-text>

                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#036358">
                        <v-btn
                          class="mr-2"
                          @click="viewInfoVehicle(item, index)"
                          >View
                        </v-btn>

                        <v-btn @click="deleteInfoVehicle(index)">
                          Delete
                        </v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>

            <div :class="isMobile ? 'd-block' : 'd-flex'">
              <v-btn
                color="success"
                class="mr-4 mb-4"
                @click="addVehicleBlock()"
                :small="isMobile"
              >
                Add vehicle
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                class="mr-4"
                @click="create"
                :small="isMobile"
              >
                Save
              </v-btn>

              <v-btn color="warning" @click="reset" :small="isMobile">
                Reset
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-flex>

      <customer-sell></customer-sell>

      <add-vehicle
        v-if="receptionSellAddVehicle"
        :vehicleIndex.sync="vehicleIndex"
        :vehicleItem.sync="vehicleItem"
      ></add-vehicle>
    </v-container>
  </div>
</template>

<script>
// component
import CustomerSellComponent from "./CustomerSell.vue";
import AddVehicleComponent from "./AddVehicle.vue";
import EmployeeDropDown from "@/components/custom/EmployeeDropDown.vue";

// Model
import ReceptionCustomerSell from "@/store/models/reception_customer_sell";
import Customer from "@/store/models/customer";
import VehicleType from "@/store/models/vehicle_type";

// service
import HTTP from "@/services/http";
import Modal from "@/store/models/modal";

//mixin
import isMobile from "@/mixin/is_mobile";

export default {
  mixins: [isMobile],

  components: {
    "customer-sell": CustomerSellComponent,
    "add-vehicle": AddVehicleComponent,
    "employee-dropdown": EmployeeDropDown
  },

  created() {
    this.onResize();
  },

  data() {
    return {
      valid: true,
      lazy: false,
      vehicleIndex: null,
      vehicleItem: null,
      technicalTestPosition: 2,
      employeeTest: null,

      isMobile: false
    };
  },

  methods: {
    addVehicleBlock() {
      var newObj = {
        registrationPlate: null,
        bikeCode: null,
        bikeStatus: null,
        image: null,
        minPrice: null,
        maxPrice: null,
        vehicleTypeId: null,
        loadImage: null
      };
      var payload = {
        item: newObj,
        index: null
      };
      this.$store.dispatch("entities/vehicleTest/add", payload);
    },

    viewInfoVehicle(item, index) {
      this.vehicleIndex = index;
      this.vehicleItem = { ...item };
      Modal.dispatch("receptionSellAddVehicle", { option: "show" });
    },

    deleteInfoVehicle(index) {
      this.$store.dispatch("entities/vehicleTest/remove", index);
    },

    reset() {
      this.$refs.form.reset();
      this.blockPurchase = false;
      this.blockSell = false;
    },
    create: async function() {
      if (this.$refs.form.validate()) {
        var checkEmptyVehicle = this.vehicleTestArray.some(obj => {
          return obj.vehicleType === null;
        });

        if (checkEmptyVehicle || this.vehicleTestArray.length <= 0) {
          toastr.warning("<p>Please add vehilce info!</p>", "Warning", {
            timeOut: 500
          });
          return;
        }

        var dataStore = {
          employeeTest: this.employeeTest,
          customer: this.newCustomer,
          vehicleTests: this.vehicleTestArray.map(obj => ({
            ...obj,
            vehicleTypeId:
              obj.vehicleType.id != null ? obj.vehicleType.id : null,
            image: obj.image != null ? obj.image : null
          }))
        };

        var url = "/reception/customer-sell/create";
        const res = await HTTP.create(url, dataStore, {
          headers: {
            "x-access-token": $cookies.get("accessToken")
          }
        });
        if (res.status === 400) {
          toastr.error("<p>Error!</p>", "Not yet added vehicles", {
            timeOut: 500
          });
        } else if (res.status === 200) {
          await ReceptionCustomerSell.insert({
            data: res.data.data
          });
          toastr.success("<p>Create success!</p>", "Success", {
            timeOut: 500
          });
          this.$store.dispatch("entities/vehicleTest/clear");
          this.$refs.form.reset();
        } else {
          toastr.error("<p>Lỗi!</p>", "Lỗi hệ thống", { timeOut: 500 });
        }
      } else {
        toastr.warning("<p>Please fill out this form!</p>", "Warning", {
          timeOut: 500
        });
      }
    },

    colorInfo(item) {
      if (item.vehicleType) {
        return "green";
      }
    },
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  },

  computed: {
    customers() {
      return Customer.all();
    },

    newCustomer() {
      return new Customer();
    },

    vehicleTypes() {
      return VehicleType.all();
    },
    vehicleTestArray: {
      set(data) {
        this.$store.state.entities.vehicleTest.vehicleTestArray = data;
      },
      get() {
        return this.$store.state.entities.vehicleTest.vehicleTestArray;
      }
    },
    receptionSellAddVehicle() {
      return Modal.getters("receptionSellAddVehicle");
    }
  }
};
</script>
