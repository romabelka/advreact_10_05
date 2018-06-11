import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('user')
@observer
class SignIn extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text>Please Sign In:</Text>
                <View>
                    <Text>Email:</Text>
                    <TextInput
                        value = {this.props.user.email}
                        style = {styles.input}
                        onChangeText = {this.handleEmailChange}
                        keyboardType = 'email-address'
                    />
                </View>
                <View>
                    <Text>Password:</Text>
                    <Text>isValidPassowrd: {this.props.user.isValidPassword}</Text>
                    <TextInput
                        value = {this.props.user.password}
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

    handleEmailChange = this.props.user.setEmail
    handlePasswordChange = this.props.user.setPassword

    handleSubmit = this.props.user.signIn
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