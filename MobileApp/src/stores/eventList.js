import {observable, action} from 'mobx'
import firebase from 'firebase/app'

export default class EventListStore {

    @observable events = []
    @observable loading = false;
    @observable isLoaded = false;

    @action setLoadedEvents = (snapshot) => {
      this.loading = false
      this.isLoaded = true
      this.events = Object.entries(snapshot.val()).map(([uid, event]) => ({...event, uid}))
    }

    @action loadEvents = () => {
        this.loading = true;
        firebase.database().ref('events').once('value')
          .then(this.setLoadedEvents)
          .catch(error => console.error(error))
    }
}