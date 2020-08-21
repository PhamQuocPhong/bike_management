<template> </template>

<script>
import Emyployee from "@/store/models/employee";
import Customer from "@/store/models/customer";
import User from "@/store/models/user";
import TechnicalTest from "@/store/models/technical_test";
import TechnicalRepair from "@/store/models/technical_repair";
import ReceptionCustomerSell from "@/store/models/reception_customer_sell";
import ReceptionCustomerBuy from "@/store/models/reception_customer_buy";
import Transaction from "@/store/models/transaction";
import TransactionDetailBuy from "@/store/models/transaction_detail_buy";
import TransactionDetailSell from "@/store/models/transaction_detail_sell";
import SalesCustomerBuy from "@/store/models/sales_customer_buy";
import Sales from "@/store/models/sales";
import VehicleType from "@/store/models/vehicle_type";
import Vehicle from "@/store/models/vehicle";
import VehicleTest from "@/store/models/vehicle_test";
import VehicleSuggest from "@/store/models/vehicle_suggest";
import VehiclePurchase from "@/store/models/vehicle_purchase";
import VehicleRepair from "@/store/models/vehicle_repair";

export default {
  data() {
    return {
      userInfo: this.$cookies.get("dataUser")
    };
  },

  mounted() {
    // remove user in socket
    this.$socket.emit("removeUser", {
      userId: this.userInfo.id
    });

    // clear user in cookies
    this.$cookies.remove("accessToken");
    this.$cookies.remove("dataUser");

    Emyployee.deleteAll();
    Customer.deleteAll();
    User.deleteAll();
    TechnicalTest.deleteAll();
    TechnicalRepair.deleteAll();
    ReceptionCustomerSell.deleteAll();
    ReceptionCustomerBuy.deleteAll();
    Transaction.deleteAll();
    TransactionDetailBuy.deleteAll();
    TransactionDetailSell.deleteAll();
    SalesCustomerBuy.deleteAll();
    Sales.deleteAll();
    VehicleType.deleteAll();
    Vehicle.deleteAll();
    VehicleTest.deleteAll();
    VehiclePurchase.deleteAll();
    VehicleRepair.deleteAll();
    VehicleSuggest.deleteAll();
    this.$router.replace("/auth/login");
  }
};
</script>
