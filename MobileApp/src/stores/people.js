import EntitiesStore, { subscribeHelper } from './entities-store'
import { computed, action } from 'mobx'
import groupBy from 'lodash/groupBy'
import firebase from 'firebase/app'
import { decode } from 'base64-arraybuffer'

class PeopleStore extends EntitiesStore {
  @computed
  get sections() {
    const grouped = groupBy(this.list, (person) => person.firstName.charAt(0))

    return Object.entries(grouped).map(([letter, list]) => ({
      title: `${letter}, ${list.length} people`,
      data: list.map((person) => ({ key: person.uid, person }))
    }))
  }

  @action loadAll = subscribeHelper('people')

  async saveAvatar(uid, { base64 }) {
    const ref = firebase.storage().ref(`people/${uid}/avatar.jpg`)

    await ref.put(decode(base64))
    const avatar = await ref.getDownloadURL()

    this.updatePerson(uid, { avatar })
  }

  @action
  updatePerson = (uid, data) =>
    firebase
      .database()
      .ref(`people/${uid}`)
      .update(data)
}

export default PeopleStore
