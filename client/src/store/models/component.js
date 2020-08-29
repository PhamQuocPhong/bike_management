import { Model } from "@vuex-orm/core";
import CookieService from '@/services/cookie';

export default class Component extends Model {
  static entity = "component";

  static fields() {
    return {
      id: this.attr(null)
    };
  }
}
