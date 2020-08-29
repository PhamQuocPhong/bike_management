import { Model } from "@vuex-orm/core";
import CookieService from '@/services/cookie';
import VehicleType from "./vehicle_type";
import TechnicalTest from "./technical_test";
export default class VehicleTest extends Model {
  static entity = "vehicleTest";

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null),
      color: this.attr(null),
      registrationPlate: this.attr(null),
      bikeStatus: this.attr(null),
      image: this.attr(null),
      minPrice: this.attr(null),
      maxPrice: this.attr(null),
      receptionCustomerSellId: this.attr(null),
      technicalTestId: this.attr(null),
      vehicleTypeId: this.attr(null),
      vehicleType: this.belongsTo(VehicleType, "vehicleTypeId"),
      technicalTest: this.belongsTo(TechnicalTest, "technicalTestId"),

      selected: this.attr(null)
    };
  }

  static apiConfig = {

    
    // headers: { 
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Authorization': 'Bearer ' + CookieService.get("accessToken"),
    // },

    actions: {
      async update(id, data) {
        try {
          return await this.post(`/technical/vehicle-test/${id}`, data, {
            save: false,
            
          });
        } catch (error) {
          return error.response;
        }
      },

      async fetchAll(id, data) {
        try {
          return await this.get("/technical/vehicle-test/", {
            save: false,
            
          });
        } catch (error) {
          return error.response;
        }
      }
    }
  };
}
