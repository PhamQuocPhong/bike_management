import { Model } from "@vuex-orm/core";
import CookieService from '@/services/cookie';
import VehicleType from "./vehicle_type";

export default class Vehicle extends Model {
  static entity = "vehicle";

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null),
      color: this.attr(null),
      code: this.attr(null),
      registrationPlate: this.attr(null),
      price: this.attr(null),
      fixPrice: this.attr(null),
      buyPrice: this.attr(null),
      quantity: this.attr(null),
      image: this.attr(null),
      valid: this.attr(null),
      description: this.attr(null),
      vehicleTypeId: this.attr(null),
      vehicleType: this.belongsTo(VehicleType, "vehicleTypeId"),
      selected: this.attr(null)
    };
  }

  static apiConfig = {
    actions: {
      async create(payload) {
        try {
          return await this.post("/vehicle/create", payload, {
            save: false,
          });
        } catch (error) {
          return error.response;
        }
      },

      async fetchPaging(page, itemPerPage = null) {

        try {
          return await this.get("/vehicle/page/" + page, {
            params: {
              itemPerPage: itemPerPage
            },
            save: false,
          });
        } catch (error) {
          return error.response;
        }
      },

      async fetchByType(vehicleTypeId) {
        try {
          return await this.get("/vehicle", {
            save: false,
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
