import { Model } from "@vuex-orm/core";
import User from "./user";

export default class UserNotification extends Model {
  static entity = "userNotification";

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null),
      receiverName: this.attr(null),
      senderName: this.attr(null),
      spaceTime: this.attr(null)
    };
  }

  static apiConfig = {
    actions: {
      async fetchPaging(userId, type, page, itemPerPage = null) {
        try {
          return await this.get("/user/notification/" + userId, {
            params: {
              page: page,
              itemPerPage: itemPerPage,
              type: type
            },
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
