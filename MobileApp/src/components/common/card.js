import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'

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
        backgroundColor: '#DDD',
        marginTop: 10,
        marginBottom: 10,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 2, height: 2
        },
        shadowOpacity: 0.5
    }
})

export default Card