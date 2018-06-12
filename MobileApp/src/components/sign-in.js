import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('auth')
@observer
class SignIn extends Component {
    render() {
        console.log('---', this.props.auth.email)
        return (
            <View style = {styles.container}>
                <Text>Please Sign In:</Text>
                <View>
                    <Text>Email:</Text>
                    <TextInput
                        value = {this.props.auth.email}
                        style = {styles.input}
                        onChangeText = {this.handleEmailChange}
                        keyboardType = 'email-address'
                    />
                </View>
                <View>
                    <Text>Password:</Text>
                    <Text>isValidPassowrd: {this.props.auth.isValidPassword}</Text>
                    <TextInput
                        value = {this.props.auth.password}
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

    handleEmailChange = this.props.auth.setEmail
    handlePasswordChange = this.props.auth.setPassword

    handleSubmit = this.props.auth.signIn
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