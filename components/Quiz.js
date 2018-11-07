import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import InputButton from './InputButton';

import { charcoal, cream, tan } from '../utils/color';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { global } from '../utils/global';

class Quiz extends Component {
  state = {
    questionIndex: 0,
    showAnswer: false,
    correctAnswers: 0,
    incorrectAnswers: 0,
  };

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: `${deckId} Quiz`,
    };
  };

  renderQuestion = (index, deck) => (
    <View style={ global.wrapper }>
      <Text style={[
          global.cardSubHeader,
          { marginBottom: 10 },
        ]}>
        { index + 1 } / { deck.question.length }
      </Text>
      <Text style={[
          global.cardHeader,
          { marginBottom: 40 },
        ]}>
        { deck.question[index].question }
      </Text>
      <InputButton
        backgroundColor={ 'transparent' }
        borderColor={ 'transparent' }
        color={ cream }
        onPress={ this.toggleShowAnswer }>
        Show Answer
      </InputButton>
    </View>
  );

  renderAnswer = (index, deck) => (
    <View style={ global.wrapper }>
      <Text style={[
          global.cardSubHeader,
          { marginBottom: 10 },
        ]}>
        { index + 1 } / { deck.question.length }
      </Text>
      <Text style={[
          global.cardHeader,
          { marginBottom: 40 },
        ]}>
        { deck.question[index].answer }
      </Text>
      <InputButton
        backgroundColor={ 'transparent' }
        borderColor={ 'transparent' }
        color={ cream }
        onPress={ this.toggleShowAnswer }>
        Show Question
      </InputButton>
      <InputButton
        backgroundColor={ cream }
        borderColor={ cream }
        color={ charcoal }
        onPress={() => this.incrementAnswers('correctAnswers')}>
        Correct
      </InputButton>
      <InputButton
        backgroundColor={ tan }
        borderColor={ tan }
        color={ cream }
        onPress={() => this.incrementAnswers('incorrectAnswers')}>
        Incorrect
      </InputButton>
    </View>
  );

  renderScore = () => {
    clearLocalNotification()
      .then(setLocalNotification());
    return (
      <View style={ global.wrapper }>
        <Text style={[
            global.cardSubHeader,
            { marginBottom: 5 },
          ]}>Correct Answers: { this.state.correctAnswers }</Text>
        <Text style={[
            global.cardSubHeader,
            { marginBottom: 5 },
          ]}>Incorrect Answers: { this.state.incorrectAnswers }</Text>
        <Text style={[
            global.cardHeader,
            { marginBottom: 40 },
          ]}>
          Total Score: { (this.state.correctAnswers / this.props.deck.question.length * 100).toFixed() }%
        </Text>
        <InputButton
          borderColor={ cream }
          color={ cream }
          onPress={ this.reset }>
          Take it again!
        </InputButton>
        <InputButton
          backgroundColor={ cream }
          borderColor={ cream }
          color={ charcoal }
          onPress={ () => this.props.navigation.navigate('Deck', { deckId: this.props.deckId }) }>
          Back To Deck
        </InputButton>
      </View>
    );
  };

  incrementAnswers = (key) => {
    this.toggleShowAnswer();
    this.setState((state) => ({
      ...state,
      [key]: state[key] + 1,
      questionIndex: state.questionIndex + 1,
    }));
  };

  toggleShowAnswer = () => {
    this.setState((state) => ({
      ...state,
      showAnswer: !state.showAnswer,
    }));
  };

  reset = () => {
    this.setState(() => ({
      questionIndex: 0,
      showAnswer: false,
      correctAnswers: 0,
      incorrectAnswers: 0,
    }));
  };

  render() {
    const { deck } = this.props;
    const { questionIndex, showAnswer } = this.state;

    return (
      <View style={[
          global.darkBackground,
          { padding: 10,
            flex: 1,
          },
        ]}> {
          showAnswer === false
          ?  questionIndex < deck.question.length
            ? this.renderQuestion(questionIndex, deck)
            : this.renderScore()
          : this.renderAnswer(questionIndex, deck)
        }</View>
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

export default connect(mapStateToProps)(Quiz);
