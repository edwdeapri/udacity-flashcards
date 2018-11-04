import { Constants } from 'expo';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import NewCard from './components/NewCard';
import reducer from './reducers';

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

const StackNavigation = createStackNavigator({
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add Flashcard',
    },
  },
});

const store = createStore(reducer);

export default class App extends React.Component {
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
