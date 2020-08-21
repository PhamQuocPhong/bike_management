import { Model } from "@vuex-orm/core";
import Vehicle from "./vehicle";
import SalesCustomerBuy from "./sales_customer_buy";
export default class VehicleSuggest extends Model {
  static entity = "vehicleSuggest";

  static fields() {
    return {
      id: this.attr(null),
      vehicleId: this.attr(null),
      vehicle: this.belongsTo(Vehicle, "vehicleId"),
      salesCustomerBuyId: this.attr(null),
      salesCustomerBuy: this.belongsTo(SalesCustomerBuy, "salesCustomerBuyId"),
      selected: this.attr(null)
    };
  }

  static apiConfig = {
    actions: {
      fetchAll() {},

      fetchByType(vehicleTypeId) {
        try {
          return this.get("/vehicle", {
            save: false,
            headers: { "x-access-token": $cookies.get("accessToken") },
            params: {
              vehicleTypeId: vehicleTypeId
            }
          });
        } catch (e) {
          return e.response;
        }
      }
    }
  };
}
