import { Model } from "@vuex-orm/core";

export default class Customer extends Model {
  static entity = "cusomter";

  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(null),
      email: this.attr(null),
      phoneNumber: this.attr(null),
      address: this.attr(null)
    };
  }

  static apiConfig = {
    actions: {
      fetchAll: {
        method: "get",
        url: "/customer/list",
        dataTransformer: response => {
          return response.data;
        }
      }
    }
  };

  // static fechAll(){
  //   const baseURL = 'http://localhost:3000/api/'
  //     return this.api().get('customer/list',{
  //       dataTransformer: (response) => {
  //           this.insert({data: response.data})
  //       }
  //     })
  // }
}
