import {NavigationActions} from 'react-navigation'

export default class NavigationStore {
    setRef = ref => this.ref = ref

    navigate = (to) => this.ref.dispatch(NavigationActions.navigate({
        routeName: to
    }))
}