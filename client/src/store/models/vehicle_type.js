import { Model } from "@vuex-orm/core";

export default class VehicleType extends Model {
  static entity = "vehicleType";

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null)
    };
  }

  static apiConfig = {

    headers: { 
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + CookieService.get("accessToken"),
    },

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
