import { Model } from "@vuex-orm/core";
import CookieService from '@/services/cookie';

export default class Modal extends Model {
  static entity = "modal";

  static fields() {
    return {
      id: this.attr(null)
    };
  }
}
