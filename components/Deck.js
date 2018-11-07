import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import { connect } from 'react-redux';

import InputButton from './InputButton';

import { charcoal, cream } from '../utils/color';
import { global } from '../utils/global';

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
      <Animated.View style={[
          global.darkBackground,
          global.center,
          { padding: 20,
            opacity: 0.2, },
          ]}>
        <Text style={[
            global.cardHeader,
            { color: cream,
              marginBottom: 10, },
            ]}>
            { deck.title }
          </Text>
          { deck.question.length > 0
            ? <Text style={[
              global.cardSubHeader,
              { marginBottom: 50 },
            ]}>
            ({ deck.question.length } cards)
          </Text>
          : <Text style={[
            global.cardSubHeader,
            { marginBottom: 50, },
          ]}>
          There are currently no cards.
        </Text>
        }
        <InputButton
          borderColor={ cream }
          color={ cream }
          onPress={ this.handleAddCard }>
          Add Card
        </InputButton>
        <InputButton
          backgroundColor={ cream }
          borderColor={ cream }
          color={ charcoal }
          isDisabled={ deck.question.length === 0 }
          onPress={ this.handleStartQuiz }>
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
