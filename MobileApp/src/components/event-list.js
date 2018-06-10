import React, { Component } from 'react'
import {SectionList, StyleSheet, Text} from 'react-native'
import Card from './common/card'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <SectionList
              renderItem={({item}) => (
                <Card key = {item.uid}>
                  <Text>{item.title}</Text>
                </Card>
              )}
              renderSectionHeader={({section: {title}}) => (
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
              )}
              sections={this.props.sections}
              keyExtractor={(item) => item.uid}
            />
        )
    }
}


const styles = StyleSheet.create({
})

export default EventList