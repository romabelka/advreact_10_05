import React, { Component } from 'react'
import {View, Text, Image, StyleSheet, Button, TouchableOpacity} from 'react-native'
import ConfirmModal from '../common/confirm-modal'
import {web} from 'react-native-communications'
import {observer, inject} from 'mobx-react'


class Person extends Component {
    static propTypes = {

    };

    state = {
        confirmModal: false
    }

    render() {
        const {makePhoto, person} = this.props
          // console.log(this.props.navigation)
        return (
            <View style = {styles.container}>
                <Text style = {[styles.text, styles.header]}>{person.email}</Text>
                <Button title = 'Make photo' onPress = {makePhoto}/>
            </View>
        )
    }


    openPage = () => {
        web(this.props.person.url)
    }

    handleDelete = () => {
        this.setState({
            confirmModal: true
        })
    }

    confirmDelete = () => this.setState({ confirmModal: false })
    cancelDelete = () => this.setState({ confirmModal: false })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#F2F2F2',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 5
    },
    text: {
        width: '100%',
        height: 100,
        marginBottom: 20,
        textAlign: 'center'
    },
    image: {
        width: 200,
        height: 100
    },
    button: {
        width: '100%',
        height: 100,
        marginBottom: 30
    }
})

export default Person