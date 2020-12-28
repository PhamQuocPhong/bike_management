import { Model } from "@vuex-orm/core";
import CookieService from '@/services/cookie';

export default class User extends Model {
  static entity = "user";

  static fields() {
    return {
      id: this.attr(null),
      email: this.attr(null),
      password: this.attr(null),
      avatar: this.attr(null)
    };
  }

  static apiConfig = {
   
  	actions: {
  		async getInfo(id){
  			try {
          return await this.get(`/user/${id}`, {
            save: false,
            
          });
        } catch (error) {
          return error.response;
        }
  		},

      async uploadAvatar(id, data){
        try {
          return await this.post(`/user/upload-avatar/${id}`, data, {
            save: false,
          });
        } catch (error) {
          return error.response;
        }
      },

      async updateUserInfo(id, data){
        try {
          return await this.put(`/user/update-info/${id}`, data, {
            save: false,
          });
        } catch (error) {
          return error.response;
        }
      }
  	}
  }

}
