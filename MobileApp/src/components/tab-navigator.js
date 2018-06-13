import { createBottomTabNavigator } from 'react-navigation';
import AuthScreen from './screens/auth'
import EventListScreen from './screens/event-list'
import PeopleScreen from './screens/people'

export default createBottomTabNavigator({
    auth: {
        screen: AuthScreen
    },
    eventList: {
        screen: EventListScreen
    },
    peopleList: {
        screen: PeopleScreen
    }
})