import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import AuthScreen from './screens/auth'
import EventList from './screens/event-list'
import PeopleList from './screens/people-list'
import EventScreen from './screens/event'
import EventMapScreen from './screens/event-map'
import CameraScreen from "./screens/camera";

const ListsNavigator = createBottomTabNavigator({
    events: {
        screen: EventList
    },
    people: {
        screen: PeopleList
    },
    camera: {
        screen: CameraScreen
    }
})


export default createStackNavigator({
    auth: {
        screen: AuthScreen,
        navigationOptions: {
            title: 'Auth'
        }
    },
    lists: {
        screen: ListsNavigator,
        navigationOptions: {
            title: 'Lists'
        }
    },
    event: {
        screen: EventMapScreen
    }
})