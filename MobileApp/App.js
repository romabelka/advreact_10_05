import { configure } from 'mobx'
import { Provider } from 'mobx-react'

configure({ enforceActions: true })

import React from 'react'
import { View, Image } from 'react-native'

import AppNavigator from './src/components/app-navigator'
import stores from './src/stores'

export default class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <AppNavigator ref={this.setNavRef} />
      </Provider>
    )
  }

  setNavRef = (ref) => {
    stores.navigation.setRef(ref)
  }
}
