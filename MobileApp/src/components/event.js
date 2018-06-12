import React, { Component } from 'react'
import {View, StyleSheet, Text, Button, Modal} from 'react-native'

class Event extends Component {
    static propTypes = {

    }

    state = {
        modalVisible: false,
    }

    removeEvent = (event) => {
        console.log('Remove event: ', event)
        this.setModalVisible(false)
    }

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible})
    }

    render() {
        const {event} = this.props
        const {modalVisible} = this.state

        return (
            <View style = {styles.container}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={modalVisible}
                  onRequestClose={() => {
                    alert('Modal has been closed.');
                  }}>
                  <View style={{marginTop: 22}}>
                    <View>
                      <Text>Are you sure?</Text>

                      <Text>{"\n"}</Text>
                      <Button
                        onPress={() => this.removeEvent(event)}
                        title="Yes"
                        color="#841584"
                      />
                      <Text>{"\n"}</Text>
                      <Button
                        onPress={() => this.setModalVisible(!modalVisible)}
                        title="No"
                        color="#841584"
                      />
                    </View>
                  </View>
                </Modal>

                <Text>Selected event:{"\n"}</Text>

                {Object.entries(event).map(([key, value]) => <Text key={key}>{`${key}: ${value}`}</Text>)}

                <Text>{"\n"}</Text>
                <Button
                  onPress={() => this.setModalVisible(true)}
                  title="Remove event"
                  color="#841584"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDD',
        marginTop: 10,
        marginBottom: 30,
        padding: 5,
    }
})

export default Event
