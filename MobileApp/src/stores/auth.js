import {observable, action} from 'mobx'
import firebase from 'firebase/app'
import BasicStore from './basic-store'

class AuthStore extends BasicStore {
    constructor(...args) {
        super(...args)

        firebase.auth().onAuthStateChanged(action(user => this.user = user))
    }

    @observable email = ''
    @observable password = ''
    @observable user = null

    @action setEmail = email => this.email = email
    @action setPassword = password => this.password = password

    signIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    }


}

export default AuthStore