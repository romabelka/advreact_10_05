import {observable, action} from 'mobx'

export default class EventStore {
    constructor(navigationStore) {
      this.navigationStore = navigationStore
    }

    @observable event = null

    @action setEvent = (event) => {
      this.event = event
      this.navigationStore.navigate('event')
    }
}