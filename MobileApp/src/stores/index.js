import '../config'

import UserStore from './user'
import NavigationStore from './navigation'
import EventListStore from './eventList'

export const navigationStore = new NavigationStore
export const userStore = new UserStore(navigationStore)
export const eventListStore = new EventListStore()

export default {
    user: userStore,
    navigation: navigationStore,
    eventList: eventListStore
}