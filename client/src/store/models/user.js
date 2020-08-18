import { Model } from '@vuex-orm/core'

export default class User extends Model {
  static entity = 'user'

  static fields () {
    return {
      id: this.attr(null),
      email: this.attr(null),
      password: this.attr(null),
      avatar: this.attr(null),
    }
  }
}