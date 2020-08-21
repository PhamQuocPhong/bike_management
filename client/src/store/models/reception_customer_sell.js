import { Model } from "@vuex-orm/core";
import Customer from "./customer";
import Employee from "./employee";
import VehicleTest from "./vehicle_test";
export default class ReceptionCustomerSell extends Model {
  static entity = "receptionCustomerSell";

  static fields() {
    return {
      id: this.attr(null),
      status: this.attr(null),
      employeeId: this.attr(null),
      customerId: this.attr(null),
      employee: this.belongsTo(Employee, "employeeId"),
      customer: this.belongsTo(Customer, "customerId"),
      vehicleTests: this.hasMany(VehicleTest, "receptionCustomerSellId")
    };
  }

  static apiConfig = {
    actions: {
      async fetchAll() {
        try {
          return await this.get("/reception/customer-sell", {
            save: false,
            headers: { "x-access-token": $cookies.get("accessToken") }
          });
        } catch (error) {
          return error.response;
        }
      },

      async fetchPaging(page, itemPerPage = null) {
        try {
          return await this.get("/reception/customer-sell/page/" + page, {
            params: {
              itemPerPage: itemPerPage
            },
            save: false,
            headers: { "x-access-token": $cookies.get("accessToken") }
          });
        } catch (error) {
          return error.response;
        }
      }
    }
  };
}
