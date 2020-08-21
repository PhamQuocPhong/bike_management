import { Model } from "@vuex-orm/core";
import Customer from "./customer";
import Sales from "./sales";
import ReceptionCustomerBuy from "./sales";
import VehicleSuggest from "./vehicle_suggest";
export default class SalesCustomerBuy extends Model {
  static entity = "salesCustomerBuy";

  static fields() {
    return {
      id: this.attr(null),
      customerRequire: this.attr(null),
      status: this.attr(null),
      contactFlg: this.attr(null),
      receptionCustomerBuyId: this.attr(null),
      saleId: this.attr(null),
      customerId: this.attr(null),
      sales: this.belongsTo(Sales, "saleId"),
      customer: this.belongsTo(Customer, "customerId"),
      vehicleSuggests: this.hasMany(VehicleSuggest, "salesCustomerBuyId")
    };
  }

  static apiConfig = {
    actions: {}
  };
}
