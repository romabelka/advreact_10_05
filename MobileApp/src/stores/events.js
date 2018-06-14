import { observable, action } from 'mobx'
import firebase from 'firebase/app'
import { fbToEntities } from './utils'

export default class EventsStore {
  @observable loading = false
  @observable loaded = false
  @observable entities = null

  getAllEvents = action(() => {
    this.loading = true

    firebase
      .database()
      .ref('events')
      .once(
        'value',
        action((data) => {
          this.loading = false
          this.entities = fbToEntities(data.val())
          this.loaded = true
        })
      )
  })
}
