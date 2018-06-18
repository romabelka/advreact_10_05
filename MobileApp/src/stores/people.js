import EntitiesStore, {subscribe} from './entities-store'
import {computed, action, observable} from 'mobx'
import groupBy from 'lodash/groupBy'
import firebase from 'firebase/app'
import {config} from '../config'

class PeopleStore extends EntitiesStore {
  @computed
  get sections() {
    const grouped = groupBy(this.list, person => person.firstName.charAt(0))

    return Object.entries(grouped).map(([letter, list]) => ({
      title: `${letter}, ${list.length} people`,
      data: list.map(person => ({key: person.uid, person}))
    }))
  }

  @action loadAll = subscribe('people')

  async saveAvatar(uid, {uri}) {

    const avatar = uri.replace(/.*\//ig, '')
    const ref = firebase
      .storage()
      .ref(`/avatars/${uid}`)
      .child(avatar);

    const file = await fetch(uri)
      .then(res => res.blob())

    await ref.put(file).then(function (snapshot) {
      console.log('Uploaded a blob or file!');
    });

    this.updatePerson(uid, {avatar})
  }

  @action
  updatePerson = (uid, data) =>
    firebase
      .database()
      .ref(`people/${uid}`)
      .update(data)

}


export default PeopleStore