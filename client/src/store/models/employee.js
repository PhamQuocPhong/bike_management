import { Model } from "@vuex-orm/core";
import User from "./user";

export default class Employee extends Model {
  static entity = "employee";

  static fields() {
    return {
      id: this.attr(null),
      fullName: this.attr(null),
      emailPersonal: this.attr(null),
      phoneNumber: this.attr(null),
      address: this.attr(null),
      userId: this.attr(null),
      user: this.belongsTo(User, "userId")
    };
  }

  static apiConfig = {
    actions: {
      getByPostion(positionId) {
        try {
          return this.get("/employee/position/" + positionId, {
            save: false,
            headers: { "x-access-token": $cookies.get("accessToken") }
          });
        } catch (error) {
          return error.response;
        }
      }
    }
  };
}
