import { Model } from "@vuex-orm/core";

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

    headers: { 
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + CookieService.get("accessToken"),
    },

  	actions: {
  		async getInfo(id){
  			try {
          return await this.get(`/user/${id}`, {
            save: false,
            
          });
        } catch (error) {
          return error.response;
        }
  		}
  	}
  }

}
