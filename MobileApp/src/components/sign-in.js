import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native'
import {observer} from 'mobx-react'
import {userStore} from '../stores'

@observer
class SignIn extends Component {
    render() {
        return (
            <View style = {styles.container}>
                <Text>Please Sign In:</Text>
                <View>
                    <Text>Email:</Text>
                    <TextInput
                        value = {userStore.email}
                        style = {styles.input}
                        onChangeText = {this.handleEmailChange}
                        keyboardType = 'email-address'
                    />
                </View>
                <View>
                    <Text>Password:</Text>
                    <Text>isValidPassowrd: {userStore.isValidPassword}</Text>
                    <TextInput
                        value = {userStore.password}
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

    handleEmailChange = userStore.setEmail
    handlePasswordChange = userStore.setPassword

    handleSubmit = userStore.signIn
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