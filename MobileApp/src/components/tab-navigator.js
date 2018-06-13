import { createBottomTabNavigator } from 'react-navigation';
import EventListScreen from './screens/event-list'
import PeopleScreen from './screens/people'

export default createBottomTabNavigator({
    eventList: {
        screen: EventListScreen
    },
    peopleList: {
        screen: PeopleScreen
    }
})