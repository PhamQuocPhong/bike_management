import { Model } from "@vuex-orm/core";
import VehiclePurchase from "./vehicle_purchase";
import Transaction from "./transaction";
export default class TransactionDetailBuy extends Model {
  static entity = "transactionDetailBuy";

  static fields() {
    return {
      id: this.attr(null),
      averagePrice: this.attr(null),
      reducePrice: this.attr(null),
      totalPrice: this.attr(null),
      vehiclePurchaseId: this.attr(null),
      transactionId: this.attr(null),
      vehiclePurchase: this.belongsTo(VehiclePurchase, "vehiclePurchaseId"),
      transaction: this.belongsTo(Transaction, "transactionId")
    };
  }

  static apiConfig = {
    actions: {}
  };
}
