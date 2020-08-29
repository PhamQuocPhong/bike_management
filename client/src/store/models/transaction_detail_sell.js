import { Model } from "@vuex-orm/core";
import CookieService from '@/services/cookie';
import Vehicle from "./vehicle";
import Transaction from "./transaction";
export default class TransactionDetailSell extends Model {
  static entity = "transactionDetailSell";

  static fields() {
    return {
      id: this.attr(null),
      unitPrice: this.attr(null),
      quantity: this.attr(null),
      totalPrice: this.attr(null),
      vehicleId: this.attr(null),
      transactionId: this.attr(null),
      vehicle: this.belongsTo(Vehicle, "vehicleId"),
      transaction: this.belongsTo(Transaction, "transactionId")
    };
  }

  static apiConfig = {
    actions: {}
  };
}
