import React, {Component} from 'react';
import { Modal, Text, View, Button, StyleSheet } from 'react-native';

class RemoveEventModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.modalContent}>
              <Text>Delete?</Text>
              <Button
                onPress={() => {
                  this.setModalVisible(false);
                }}
                title={'cancel'}
              />
            </View>
          </View>
        </Modal>

        <Button
          onPress={() => {
            this.setModalVisible(true);
          }}
          title={'remove event'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 50,
  }
});

export default RemoveEventModal