import React, { Component } from 'react'
import { Modal, View, Text, Button, StyleSheet } from 'react-native'

class ConfirmationModal extends Component {
    render() {
        const {visible, children, onConfirm, onCancel} = this.props
        return (
            <Modal visible={visible} animationType="fade">
                <View style={styles.modal}>
                    <Text>{children}</Text>
                    <Button title="Ok" onPress={onConfirm} />
                    <Button title="Cancel" onPress={onCancel} />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default ConfirmationModal