import React, { Component } from 'react'
import {View, Text, TextInput, Platform, Button, Alert} from 'react-native'

class SignIn extends Component {
    static propTypes = {

    };

    state = {
        email: '',
        password: ''
    }

    render() {
        return (
            <View>
                <Text>Please sign in</Text>
                <TextInput
                    value = {this.state.email}
                    style = {styles.input}
                    onChangeText = {this.handleEmailChange}
                    keyboardType = "email-address"
                />
                <TextInput
                    value = {this.state.password}
                    style = {styles.input}
                    onChangeText = {this.handlePasswordChange}
                    secureTextEntry
                />
                <Button
                  onPress={this.handleSubmit}
                  title="Sign In"
                  accessibilityLabel="Learn more about this button"
                />
            </View>
        )
    }

    handleEmailChange = email => this.setState({ email })
    handlePasswordChange = password => this.setState({ password })
    handleSubmit = () => Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )

}

const styles = {
    input: {
        ...Platform.select({
            ios: {
                borderBottomWidth: 1,
                borderBottomColor: '#000'
            },
            android: {
              elevation: 2
            }
        })
    }
}

export default SignIn