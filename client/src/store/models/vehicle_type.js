import { Model } from "@vuex-orm/core";
import CookieService from '@/services/cookie';

export default class VehicleType extends Model {
  static entity = "vehicleType";

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null)
    };
  }

  static apiConfig = {
    actions: {
      async fetchAll() {
        try {
          return await this.get(`/vehicle-type/`, {
            save: false,
            
          });
        } catch (error) {
          return error.response;
        }
      }
    }
  };
}
