import { createStackNavigator } from 'react-navigation'
import AuthScreen from './screens/auth'
import MainScreen from './screens/main'
import EventScreen from './screens/event'

export default createStackNavigator({
  auth: {
    screen: AuthScreen
  },
  main: {
    screen: MainScreen
  },
  event: {
    screen: EventScreen
  }
})
