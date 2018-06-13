import {observable, action} from 'mobx'
import firebase from 'firebase/app'

export default class EventListStore {

    @observable people = []
    @observable loading = false;
    @observable isLoaded = false;

    @action setLoadedPeople = (snapshot) => {
      this.loading = false
      this.isLoaded = true
      this.people = Object.entries(snapshot.val()).map(([uid, person]) => ({...person, uid}))
    }

    @action loadPeople = () => {
        this.loading = true;
        firebase.database().ref('people').once('value')
          .then(this.setLoadedPeople)
          .catch(error => console.error(error))
    }
}