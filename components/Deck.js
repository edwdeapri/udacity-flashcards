import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import { connect } from 'react-redux';

import InputButton from './InputButton';

class Deck extends Component {
  state = {
    opacity: new Animated.Value(0),
  };

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId,
    };
  };

  handleAddCard = () => {
    this.props.navigation.navigate(
      'NewCard',
      { deckId: this.props.deckId }
    );
  };

  handleStartQuiz = () => {
    this.props.navigation.navigate(
      'Quiz',
      { deckId: this.props.deckId }
    );
  };

  render() {
    const { deck } = this.props;
    const { opacity } = this.state;
    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start();

    return (
      <Animated.View>
        <Text>{deck.title}</Text>
        {deck.question.length > 0
          ? <Text>({deck.questions.length} cards)</Text>
          : <Text>There are currently no cards.</Text>
        }
        <InputButton onPress={this.handleAddCard}>Add Card</InputButton>
        <InputButton
          onPress={this.handleStartQuiz}
          isDisabled={deck.questions.length === 0}>
          Start Quiz
        </InputButton>
      </Animated.View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: state[deckId],
  };
}

export default connect(mapStateToProps)(Deck);
