import '../config'

import UserStore from './user'
import NavigationStore from './navigation'
import EventListStore from './eventList'
import PeopleListStore from './people'

export const navigationStore = new NavigationStore
export const userStore = new UserStore(navigationStore)
export const eventListStore = new EventListStore()
export const peopleListStore = new PeopleListStore()

export default {
    user: userStore,
    navigation: navigationStore,
    eventList: eventListStore,
    peopleList: peopleListStore
}