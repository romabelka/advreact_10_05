import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import ConfirmationModal from './common/confirmation-modal'

class Event extends Component {
    state = {
        showConfirmationModal: false
    }

    render() {
        const { event } = this.props

        return (
            <View>
                <Text>{event.title}</Text>
                <Text>{event.when}</Text>
                <Text>{event.where}</Text>
                <Button
                    title="Delete"
                    onPress={this.handleToggleConfirmationModal}
                />
                <ConfirmationModal
                    visible = {this.state.showConfirmationModal}
                    onConfirm = {this.handleToggleConfirmationModal}
                    onCancel = {this.handleToggleConfirmationModal}
                >
                    Delete {event.title}?
                </ConfirmationModal>
            </View>
        )
    }

    handleToggleConfirmationModal = () =>
        this.setState({
            showConfirmationModal: !this.state.showConfirmationModal
        })
}

export default Event