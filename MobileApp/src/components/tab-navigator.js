import { createBottomTabNavigator } from 'react-navigation';
import AuthScreen from './screens/auth'
import EventListScreen from './screens/event-list'
import EventScreen from './screens/event'

export default createBottomTabNavigator({
    auth: {
        screen: AuthScreen
    },
    eventList: {
        screen: EventListScreen
    },
    event: {
        screen: EventScreen
    }
})