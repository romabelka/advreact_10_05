import React, {Component} from 'react'
import {Text, ScrollView, View, StyleSheet, Button, Modal} from 'react-native'

class EventScreen extends Component {
  static propTypes = {};

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {

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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{margin: 10}}>
            <View>
              <Text>Удалить это мероприятие?</Text>

              <Button
                title="Нет"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
              </Button>
              <Text></Text>
              <Button
                title="Ни в коем случае"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
              </Button>
              <Text></Text>
              <Button
                title="Никогда"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
              </Button>
            </View>
          </View>
        </Modal>
        <ScrollView>
          {fields.map((field, index) => {
              if (index % 2 === 0) {
                return <Text style={{backgroundColor: '#9EF'}} key={index}>{field}</Text>
              }
              return <Text style={styles.event} key={index}>{field}</Text>
            }
          )}
        </ScrollView>
        <Button
          title="Удалить"
          onPress={() =>
            this.setModalVisible(true)
          }
        />
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
