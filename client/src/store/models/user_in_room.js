import { Model } from '@vuex-orm/core'

export default class UserInRoom extends Model {
  static entity = 'userInRoom'

  static fields () {
    return {
      id: this.attr(null),
      email: this.attr(null),
      password: this.attr(null)
    }
  }
}