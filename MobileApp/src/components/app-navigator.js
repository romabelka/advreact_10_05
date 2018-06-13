import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import AuthScreen from './screens/auth'
import EventListScreen from './screens/event-list'
import EventScreen from './screens/event'
import PeopleListScreen from './screens/people-list'

const TabNavigator = createBottomTabNavigator({
  eventList: {
    screen: EventListScreen
  },
  peopletList: {
    screen: PeopleListScreen
  }
})

export default createStackNavigator({
  auth: {
    screen: AuthScreen
  },
  eventList: {
    screen: TabNavigator
  },
  event: {
    screen: EventScreen
  }
})
