import { Model } from "@vuex-orm/core";
import Employee from "./employee";
import SalesCustomerBuy from "./sales_customer_buy";

import CookieService from '@/services/cookie'

export default class Sales extends Model {
  static entity = "sales";

  static fields() {
    return {
      id: this.attr(null),
      totalPrice: this.attr(null),
      employeeId: this.attr(null),
      employee: this.belongsTo(Employee, "employeeId"),
      salesCustomerBuy: this.hasOne(SalesCustomerBuy, "saleId")
    };
  }

  static apiConfig = {

    headers: { 
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + CookieService.get("accessToken"),
    },

    actions: {
      async fetchAll() {
        try {
          return await this.get("/sales/", {
            save: false,
          });
        } catch (error) {
          return error.response;
        }
      },

      async fetchPaging(page, itemPerPage = null) {

        try {
          return await this.get("/sales/page/" + page, {
            params: {
              itemPerPage: itemPerPage
            },
            save: false,
          });
        } catch (error) {
          return error.response;
        }
      },

      async suggestVehicles(data) {
        try {
          return await this.post("/sales/suggest-vehicles", data, {
            save: false,
          });
        } catch (error) {
          return error.response;
        }
      },

      async contactCustomer(id, payload) {
        try {
          return await this.post("/sales/contact-customer/" + id, payload, {
            save: false,
          });
        } catch (error) {
          return error.response;
        }
      }
    }
  };
}
