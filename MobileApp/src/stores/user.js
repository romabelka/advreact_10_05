import {observable, computed, action} from 'mobx'
import firebase from 'firebase/app'

export default class UserStore {
    @observable email = ''
    @observable password = ''
    @observable user = null

    @computed get isValidPassword() {
        return this.password.length >= 8
    }

    @action setEmail = (email) => this.email = email
    @action setPassword = (password) => this.password = password

    signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => this.user = user)
            .catch(error => console.error(error))
        this.user = {}
    }
}