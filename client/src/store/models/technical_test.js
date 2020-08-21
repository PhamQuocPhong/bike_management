import { Model } from "@vuex-orm/core";
import VehicleTest from "./vehicle_test";
export default class TechnicalTest extends Model {
  static entity = "technicalTest";

  static fields() {
    return {
      id: this.attr(null),
      minPrice: this.attr(null),
      maxPrice: this.attr(null),
      vehicleTests: this.hasMany(VehicleTest, "receptionCustomerSellId")
    };
  }

  static apiConfig = {
    actions: {
      async fetchPaging(page, itemPerPage = null) {
        try {
          return await this.get("/technical/test/page/" + page, {
            params: {
              itemPerPage: itemPerPage
            },
            save: false,
            headers: { "x-access-token": $cookies.get("accessToken") }
          });
        } catch (error) {
          return error.response;
        }
      }

      // async fetchAll(){
      //   try {
      //     return await this.get('/technical/test', {
      //         headers: {'x-access-token': $cookies.get('accessToken')},
      //         save: false
      //       })
      //     } catch(error) {
      //       return error.response
      //     }
      // },
    }
  };
}
