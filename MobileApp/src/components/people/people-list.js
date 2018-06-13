import React, { Component } from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('peopleList')
@observer
class PeopleList extends Component {

      componentDidMount() {
          this.props.peopleList.loadPeople()
      }

    render() {
          if(this.props.peopleList.loading) {
            return (
              <View style={[styles.activityIndicator]}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )
          } else if(this.props.peopleList.isLoaded) {
            return <FlatList
              data={this.props.peopleList.people}
              renderItem={({item}) => <Text>{item.firstName}</Text>}
            />
          } else {
            return null
          }

    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F0F0F0',
        height: 40,
        lineHeight: 40,
        marginBottom: 5,
        shadowOffset: {
            height: 2, width: 0
        },
        shadowOpacity: 0.3,
        elevation: 3
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    }

})

export default PeopleList