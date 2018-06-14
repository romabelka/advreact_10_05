import '../config'

import UserStore from './user'
import EventsStore from './events'
import PeopleStore from './people'
import NavigationStore from './navigation'

export const navigationStore = new NavigationStore()
export const userStore = new UserStore(navigationStore)
export const eventsStore = new EventsStore()
export const peopleStore = new PeopleStore()

export default {
  user: userStore,
  events: eventsStore,
  people: peopleStore,
  navigation: navigationStore
}
