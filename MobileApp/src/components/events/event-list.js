import React, { Component } from 'react'
import {View, Text, StyleSheet, SectionList, ActivityIndicator} from 'react-native'
import EventCard from './event-card'
import groupBy from 'lodash/groupBy'
import {observer, inject} from 'mobx-react'

@inject('eventList')
@observer
class EventList extends Component {
    static propTypes = {

    };


      componentDidMount() {
          this.props.eventList.loadEvents()
      }

    render() {
          if(this.props.eventList.loading) {
            return (
              <View style={[styles.activityIndicator]}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )
          } else if(this.props.eventList.isLoaded) {
            const grouped = groupBy(this.props.eventList.events, event => event.title.charAt(0))
            const sections = Object.entries(grouped).map(([letter, list]) => ({
              title: `${letter}, ${list.length} events`,
              data: list.map(event => ({key: event.uid, event}))
            }))
            return <SectionList
              sections = {sections}
              renderSectionHeader = {({section}) => <Text style={styles.header}>{section.title}</Text>}
              renderItem = {({item}) => <EventCard event = {item.event} key = {item.key} />}
            />
          } else {
            return null
          }

    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F0F0F0',
        height: 40,
        lineHeight: 40,
        marginBottom: 5,
        shadowOffset: {
            height: 2, width: 0
        },
        shadowOpacity: 0.3,
        elevation: 3
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center'
    }

})

export default EventList