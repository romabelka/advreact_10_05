import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native'

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    render() {
        const { email, password } = this.state
        return (
            <View style = {styles.container}>
                <Text>Please Sign In:</Text>
                <View>
                    <Text>Email:</Text>
                    <TextInput
                        value = {email}
                        style = {styles.input}
                        onChangeText = {this.handleEmailChange}
                        keyboardType = 'email-address'
                    />
                </View>
                <View>
                    <Text>Password:</Text>
                    <TextInput
                        value = {password}
                        style = {styles.input}
                        onChangeText = {this.handlePasswordChange}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity onPress = {this.handleSubmit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    handleEmailChange = email => this.setState({ email })
    handlePasswordChange = password => this.setState({ password })

    handleSubmit = () => console.log('---', this.state)
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    input: {
        ...Platform.select({
            ios: {
                borderBottomWidth: 1
            },
            android: {

            }
        })
    }
}

export default SignIn