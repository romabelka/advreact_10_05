import { observable, computed, action } from 'mobx'
import firebase from 'firebase/app'

export default class UserStore {
  constructor(stores) {
    this.navigationStore = stores.navigation
  }

  @observable email = ''
  @observable password = ''
  @observable user = null

  @computed
  get isValidPassword() {
    return this.password.length >= 8
  }

  @action setEmail = (email) => (this.email = email)
  @action setPassword = (password) => (this.password = password)

  signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.user = user
        console.log('---', 123)
        this.navigationStore.navigate('eventList')
      })
      .catch((error) => console.error(error))
    this.user = {}
  }
}
