import { Model } from "@vuex-orm/core";
import CookieService from '@/services/cookie';
import Employee from "./employee";
import SalesCustomerBuy from "./sales_customer_buy";
export default class ReceptionCustomerBuy extends Model {
  static entity = "receptionCustomerBuy";

  static fields() {
    return {
      id: this.attr(null),
      employeeId: this.attr(null),
      employee: this.belongsTo(Employee, "employeeId"),
      salesCustomerBuy: this.hasOne(SalesCustomerBuy, "receptionCustomerBuyId")
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
          return await this.get("/reception/customer-buy", {
            save: false,
          });
        } catch (error) {
          return error.response;
        }
      },

      async fetchPaging(page, itemPerPage = null) {
        try {
          return await this.get("/reception/customer-buy/page/" + page, {
            params: {
              itemPerPage: itemPerPage
            },
            save: false,
            
          });
        } catch (error) {
          return error.response;
        }
      },
      async create(payload) {
        try {
          return await this.post("/reception/customer-buy/create", payload, {
            save: false,
            
          });
        } catch (error) {
          return error.response;
        }
      },

      async update(id, payload) {
        try {
          return await this.post("/reception/customer-buy/update/" + id, payload, {
            save: false,
            
          });
        } catch (error) {
          return error.response;
        }
      }
    }
  };
}
