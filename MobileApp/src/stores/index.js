import '../config'

import UserStore from './user'
import NavigationStore from './navigation'
import EventListStore from './eventList'
import PeopleListStore from './people'
import EventStore from './event'

export const navigationStore = new NavigationStore
export const userStore = new UserStore(navigationStore)
export const eventListStore = new EventListStore()
export const peopleListStore = new PeopleListStore()
export const eventStore = new EventStore(navigationStore)

export default {
    user: userStore,
    navigation: navigationStore,
    eventList: eventListStore,
    peopleList: peopleListStore,
    eventStore
}