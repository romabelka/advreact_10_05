import { createMaterialTopTabNavigator } from 'react-navigation'
import EventListScreen from './event-list'
import PeopleListScreen from './people-list'

export default createMaterialTopTabNavigator({
  eventList: {
    screen: EventListScreen,
    navigationOptions: {
      title: 'Event List'
    }
  },
  peopleList: {
    screen: PeopleListScreen,
    navigationOptions: {
      title: 'People List'
    }
  }
})
