import {createStackNavigator} from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import TabNavigator from './tab-navigator'

export default createStackNavigator({
      auth: {
        screen: AuthScreen
      },
    lists: {
        screen: TabNavigator
    },
    event: {
        screen: EventScreen
    }
})