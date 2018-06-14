import { observable, action } from 'mobx'
import firebase from 'firebase/app'
import { fbToEntities } from './utils'

export default class PeopleStore {
  @observable loading = false
  @observable loaded = false
  @observable entities = null

  getAllPeople = action(() => {
    this.loading = true

    firebase
      .database()
      .ref('people')
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
