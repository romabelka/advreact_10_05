import React, {Component} from 'react'
import {Text, ScrollView, View, StyleSheet, Button} from 'react-native'

class EventScreen extends Component {
  static propTypes = {};

  render() {

    const {navigate} = this.props.navigation
    const item = this.props.navigation.getParam('item', {});
    const fields = Object.keys(item).reduce(
      (acc, key) => {
        acc.push(key)
        acc.push(item[key])
        return acc
      }
      , []
    )

    return (

      <View>
        <Button
          title="Events"
          onPress={() =>
            navigate('List')
          }
        />
        <ScrollView>
          {fields.map((field, index) => {
              if (index % 2 === 0) {
                return <Text style={{backgroundColor: '#9EF'}} key={index}>{field}</Text>
              }
              return <Text style={styles.event} key={index}>{field}</Text>
            }
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  event: {
    backgroundColor: '#DDD',
    marginTop: 0,
    marginBottom: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2, height: 2
    },
    shadowOpacity: 0.5,
    elevation: 3
  }
});


export default EventScreen
