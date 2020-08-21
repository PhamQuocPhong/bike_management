import { Model } from "@vuex-orm/core";

export default class Component extends Model {
  static entity = "component";

  static fields() {
    return {
      id: this.attr(null)
    };
  }
}
