import { Constants } from 'expo';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Ionicons } from '@expo/vector-icons';

import Deck from './components/Deck';
import NewCard from './components/NewCard';
import NewDeck from './components/NewDeck';
import Quiz from './components/Quiz';
import Stack from './components/Stack';
import reducer from './reducers';
import { setLocalNotification } from './utils/helpers';

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View
      style={{ backgroundColor,
        height: Constants.statusBarHeight,
      }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const TabNavigation = createBottomTabNavigator(
  {
    Stack: {
      screen: Stack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
        <Ionicons
          name='ios-add-circle-outline'
          size={30}
          color={tintColor} />,
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) =>
        <Ionicons
          name='ios-albums'
          size={30}
          color={tintColor} />,
      },
    },
  }, {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: 'white',
      style: {
        height: 50,
        backgroundColor: 'darkGray',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  });

const StackNavigation = createStackNavigator({
  Home: {
    screen: TabNavigation,
    navigationOptions: {
      header: null,
      title: 'Go Back',
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: 'Decks',
    },
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add Flashcard',
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
    },
  },
});

const store = createStore(reducer);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View>
          <FlashcardsStatusBar />
          <StackNavigation />
        </View>
      </Provider>
    );
  }
}
