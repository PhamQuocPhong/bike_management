<template>
  <div class="container">
    <v-row>
      <h2>Dashboard</h2>
    </v-row>
    <v-row class="intro">
      <v-col cols="12" :class="`${ỉntroBlock}`">
        <v-card class="block-cart" dark>
          <div class="d-flex align-center">
            <v-card-text>Total orders</v-card-text>
            <v-spacer></v-spacer>
            <v-icon class="text-right pr-2">mdi-cart-outline</v-icon>
          </div>
          <v-card-title primary-title>
            {{ allOrdes }}
          </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="12" :class="`${ỉntroBlock}`">
        <v-card class="block-bike" dark>
          <div class="d-flex align-center">
            <v-card-text>Total sold vehicles</v-card-text>
            <v-spacer></v-spacer>
            <v-icon class="text-right pr-2">mdi-moped</v-icon>
          </div>
          <v-card-title primary-title>
            {{ vehiclesSold }}
          </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="12" :class="`${ỉntroBlock}`">
        <v-card class="block-customer" dark>
          <div class="d-flex align-center">
            <v-card-text>Total customers</v-card-text>
            <v-spacer></v-spacer>
            <v-icon class="text-right pr-2">mdi-account</v-icon>
          </div>
          <v-card-title primary-title>
            {{ allCustomer }}
          </v-card-title>
        </v-card>
      </v-col>

      <v-col cols="12" :class="`${ỉntroBlock}`">
        <v-card class="block-revenue" dark>
          <div class="d-flex align-center">
            <v-card-text>Renevue / month</v-card-text>
            <v-spacer></v-spacer>
            <v-icon class="text-right pr-2">mdi-currency-usd</v-icon>
          </div>
          <v-card-title primary-title>
            {{ revenuePerMonth }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="chart">
      <v-col cols="12" :class="`${chartLine}`">
        <v-card>
          <revenue-chart
            :data="revenueChartData"
            :options="revenueChartOptions"
            v-if="loadRevenueChart"
          >
          </revenue-chart>
        </v-card>
      </v-col>

      <v-col cols="12" :class="`${chartPie}`">
        <v-card class="pl-2 pr-2">
          <analys-vehicle
            :data="vehicleChartData"
            :options="vehicleOptions"
            v-if="loadVehicleChart"
          >
          </analys-vehicle>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="social">
      <v-col cols="12" :class="`${socialBLock}`">
        <v-card>
          <v-card-title primary-title>
            Facebook
          </v-card-title>

          <v-divider></v-divider>

          <v-card-subtitle class="text-center">
            <span> 10K Follows </span>
            <v-divider class="mx-4 vertical" inset vertical></v-divider>
            <span> 200 Writes</span>
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" :class="`${socialBLock}`">
        <v-card>
          <v-card-title primary-title>
            Twitter
          </v-card-title>

          <v-divider></v-divider>

          <v-card-subtitle class="text-center">
            <span> 13K Follows </span>
            <v-divider class="mx-4 vertical" inset vertical></v-divider>
            <span> 200 Writes</span>
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="12" :class="`${socialBLock}`">
        <v-card>
          <v-card-title primary-title>
            Ins
          </v-card-title>

          <v-divider></v-divider>

          <v-card-subtitle class="text-center">
            <span> 30K Follows </span>
            <v-divider class="mx-4 vertical" inset vertical></v-divider>
            <span> 200 Feeds</span>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="rank">
      <v-col cols="12" :class="`${rankBlock}`">
        <v-card>
          <v-card-title primary-title class="border-bottom">
            Top customers
          </v-card-title>
          <v-simple-table>
            <thead>
              <th>STT</th>
              <th>Rank</th>
              <th>Name</th>
            </thead>
            <tbody>
              <tr v-for="(customer, index) in topCustomers" :key="customer.id">
                <td>{{ index + 1 }}</td>
                <td>Gold</td>
                <td>{{ customer.name }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>

      <v-col cols="12" :class="`${rankBlock}`">
        <v-card>
          <v-card-title primary-title class="border-bottom">
            Top products
          </v-card-title>

          <v-simple-table>
            <thead>
              <th>STT</th>
              <th>Rank</th>
              <th>Name</th>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Gold</td>
                <td>Phong</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Gold</td>
                <td>Phong</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Gold</td>
                <td>Phong</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style type="text/css">
.block-cart {
  background: rgb(5, 0, 98);
  background: linear-gradient(
    90deg,
    rgba(5, 0, 98, 1) 0%,
    rgba(47, 47, 161, 1) 41%,
    rgba(0, 212, 255, 1) 100%
  );
}

.block-bike {
  background: rgb(191, 25, 25);
  background: linear-gradient(
    90deg,
    rgba(191, 25, 25, 1) 0%,
    rgba(212, 29, 29, 1) 41%,
    rgba(240, 119, 119, 1) 100%
  );
}

.block-customer {
  background: rgb(11, 46, 0);
  background: linear-gradient(
    90deg,
    rgba(11, 46, 0, 1) 0%,
    rgba(51, 130, 0, 1) 41%,
    rgba(113, 241, 117, 1) 100%
  );
}

.block-revenue {
  background: rgb(244, 120, 86);
  background: linear-gradient(
    90deg,
    rgba(244, 120, 86, 1) 0%,
    rgba(247, 180, 70, 1) 41%,
    rgba(242, 198, 148, 1) 100%
  );
}

.v-divider.vertical {
  min-height: 16px;
}
</style>

<script type="text/javascript">
// store
import ComponentStore from "@/store/models/component";

// component
import LineChart from "@/components/custom/chart/Line.vue";
import PieChart from "@/components/custom/chart/Pie.vue";

// service
import HTTP from "@/services/http";
export default {
  components: {
    "revenue-chart": LineChart,
    "analys-vehicle": PieChart
  },

  async created() {
    ComponentStore.dispatch("loadingProgress", { option: "show" });
    setTimeout(async () => {
      const res = await HTTP.get("/dashboard");
      if (res.status === 200) {
        this.revenueChartData.datasets[0].data =
          res.data.data.revenueChartData.revenue;
        this.vehicleChartData = res.data.data.vehicleChart;
        this.vehiclesSold = res.data.data.vehiclesSold;
        this.allCustomer = res.data.data.allCustomer;
        this.allOrdes = res.data.data.allOrdes;
        this.revenuePerMonth = res.data.data.revenuePerMonth;
        this.topCustomers = res.data.data.topCustomers;
        this.loadRevenueChart = true;
        this.loadVehicleChart = true;
      }
      
      ComponentStore.dispatch("loadingProgress", { option: "hide" });
    }, 500)

  },

  async mounted() {

  },

  data() {
    return {
      vehiclesSold: null,
      allCustomer: null,
      allOrdes: null,
      revenuePerMonth: null,
      topCustomers: [],

      loadRevenueChart: false,
      loadVehicleChart: false,

      revenueChartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Revenue",
            data: [],
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
            pointBackgroundColor: "rgba(171, 71, 188, 1)"
          }
        ]
      },

      revenueChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Analys revenue"
        }
      },

      vehicleChartData: [40, 20, 10],

      vehicleOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },

  computed: {
    ỉntroBlock() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-xs-12";
        case "sm":
          return "col-sm-6";
        case "md":
          return "col-md-3";
        case "lg":
          return "col-lg-3";
      }
    },

    chartLine() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-xs-12";
        case "sm":
          return "col-sm-6";
        case "md":
          return "col-md-8";
        case "lg":
          return "col-lg-8";
      }
    },

    chartPie() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-xs-12";
        case "sm":
          return "col-sm-6";
        case "md":
          return "col-md-4";
        case "lg":
          return "col-lg-4";
      }
    },

    socialBLock() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-xs-12";
        case "sm":
          return "col-sm-6";
        case "md":
          return "col-md-4";
        case "lg":
          return "col-lg-4";
      }
    },
    rankBlock() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-xs-12";
        case "sm":
          return "col-sm-6";
        case "md":
          return "col-md-6";
        case "lg":
          return "col-lg-6";
      }
    }
  }
};
</script>
