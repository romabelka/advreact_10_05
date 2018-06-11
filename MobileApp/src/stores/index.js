import '../config'

import UserStore from './user'
import NavigationStore from './navigation'

export const navigationStore = new NavigationStore
export const userStore = new UserStore(navigationStore)

export default {
    user: userStore,
    navigation: navigationStore
}