import { Model } from "@vuex-orm/core";

import User from "./user";

export default class Room extends Model {
  static entity = "room";

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null),
      pin: this.attr(null),
      image: this.attr(null),
      date: this.attr(null),
      maximum: this.attr(null),
      userId: this.attr(null),
      user: this.belongsTo(User, "userId")
    };
  }

  static apiConfig = {
    actions: {
      async fetchPaging(page, itemPerPage = null) {
        try {
          return await this.get("/room/page/" + page, {
            params: {
              itemPerPage: itemPerPage
            },
            save: false,
            headers: { "x-access-token": $cookies.get("accessToken") }
          });
        } catch (error) {
          return error.response;
        }
      },

      async joinRoom(id, payload) {
        try {
          return await this.post("/room/join/" + id, payload, {
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
