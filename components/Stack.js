import { AppLoading } from 'expo';
import React, { Component } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import { addNewStack } from '../actions';
import { getDeckFromStack } from '../utils/api';

class Stack extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    getDeckFromStack()
      .then(stack => this.props.dispatch(addNewStack(stack)))
      .then(() => this.setState(() => ({ ready: true })));
  }

  renderItem = ({ item }) => {
    const { stack } = this.props;
    return (
      <TouchableOpacity onPress={() => this.viewDeck(item)} style={styles.card}>
        <Text>{stack[item].title}</Text>
        <Text>({stack[item].questions.length} Cards)</Text>
      </TouchableOpacity>
    );
  };

  viewDeck = (deckId) => {
    this.props.navigation.navigate(
      'Deck',
      { deckId }
    );
  };

  render() {
    const { stack } = this.props;
    const { ready } = this.state;
    const deckKeys = Object.keys(stack);

    if (ready === false) {
      return <AppLoading />;
    }

    return (
      <View>{
          deckKeys.length > 0
          ? <FlatList
              data={deckKeys}
              renderItem={this.renderItem}
              keyExtractor={item => item} />
          : <Text>There are no decks.</Text>
      }</View>
    );
  }
}

function mapStateToProps(stack) {
  return {
    stack,
  };
}

export default connect(mapStateToProps)(Stack);
