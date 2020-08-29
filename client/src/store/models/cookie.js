import { Model } from "@vuex-orm/core";


export default class Cookie extends Model {
  static entity = "cookie";

  static fields() {
    return {
      id: this.attr(null)
    };
  }
}
