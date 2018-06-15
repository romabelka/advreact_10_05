import {NavigationActions, StackActions} from 'react-navigation'
import {autorun} from 'mobx'
import BasicStore from "./basic-store";

export default class NavigationStore extends BasicStore {
    onInit() {
        autorun(() => {
            const {user} = this.getStore('auth')

            this.reset(user ? 'lists' : 'auth')
            console.log('---', 'user: ', user)
        })
    }

    setRef = ref => {
        this.ref = ref
        if (ref) this.onInit()
    }

    navigate = (to) => this.ref.dispatch(NavigationActions.navigate({
        routeName: to
    }))

    reset = (to) => this.ref.dispatch(StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({
                routeName: to
            })
        ]
    }))
}