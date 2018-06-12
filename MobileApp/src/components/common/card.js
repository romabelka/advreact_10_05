import React, { Component } from 'react'
import {View, StyleSheet, Platform} from 'react-native'

class Card extends Component {
    static propTypes = {

    };

    render() {
        return (
            <View style = {styles.container}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEFEFE',
        elevation: 5,
        marginTop: 10,
        marginBottom: 10,
        padding: 5,

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 2, height: 2
                },
                shadowOpacity: 0.5
            },
            android: {
                elevation: 3
            }
        }),
    }
})

export default Card
