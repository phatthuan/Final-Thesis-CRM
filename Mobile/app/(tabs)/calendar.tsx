import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import API_HOST from '@/constants/ApiHost';

interface State {
  items?: AgendaSchedule;
}

export default class AgendaScreen extends Component<State> {
  state: State = {
    items: undefined
  };

  render() {
    let today = new Date();
    today.setDate(today.getDate() + 1);

    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={today.toISOString().split('T')[0]}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
      />
    );
  }


  loadItems = (day: DateData) => {
    const items = this.state.items || {};

    setTimeout(async () => {
      try {
        const response = await axios.get(``);
        const events = response.data.items;
        console.log(events);
        events.forEach((event: any) => {
          const start = event.start.dateTime.substring(0, 10);
          const end = event.end.dateTime.substring(0, 10);
          if (!items[start]) {
            items[start] = [];
            items[start].push({
              name: "Event start summary: " + event.summary + " Event description: " + event.description + " Event location: " + event.location,
              height: 100,
              day: start,
            });
          }
          if (!items[end]) {
            items[end] = [];
            items[end].push({
              name: "Event end summary: " + event.summary + " Event description: " + event.description + " Event location: " + event.location,
              height: 100,
              day: end,
            });
          }
        })
      } catch (error) {
        console.log(error)
        Alert.alert('Error API');
      }
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
          // const numItems = Math.floor(Math.random() * 3 + 1);
          // for (let j = 0; j < numItems; j++) {
          //   items[strTime].push({
          //     name: 'Item for ' + strTime + ' #' + j,
          //     height: Math.max(50, Math.floor(Math.random() * 150)),
          //     day: strTime
          //   });
          // }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  };

  renderDay = (day: { getDay: () => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    if (day) {
      return <Text style={styles.customDay}>{day.getDay()}</Text>;
    }
    return <View style={styles.dayItem} />;
  };

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green'
  },
  dayItem: {
    marginLeft: 34
  },
});
