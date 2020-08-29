import { Model } from "@vuex-orm/core";
import CookieService from '@/services/cookie';
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

    
    // headers: { 
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Authorization': 'Bearer ' + CookieService.get("accessToken"),
    // },

    actions: {
      async fetchAll() {
        try {
          return await this.get("/reception/customer-sell", {
            save: false,
            
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
            
          });
        } catch (error) {
          return error.response;
        }
      }
    }
  };
}
