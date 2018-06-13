import '../config'

import UserStore from './user'
import EventsStore from './events'
import PeopleStore from './people'
import NavigationStore from './navigation'

class Stores {
  constructor() {
    this.navigation = new NavigationStore(this)
    this.user = new UserStore(this)
    this.events = new EventsStore(this)
    this.people = new PeopleStore(this)
  }
}

const stores = new Stores()

export default stores
