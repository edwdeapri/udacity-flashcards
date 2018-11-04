import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

import InputButton from './InputButton';

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
    <View>
      <Text>
        {index + 1} / {deck.question.length}
      </Text>
      <Text>
        {deck.question[index].question}
      </Text>
      <InputButton onPress={this.toggleShowAnswer}>Show Answer</InputButton>
    </View>
  );

  renderAnswer = (index, deck) => (
    <View>
      <Text>{index + 1} / {deck.question.length}</Text>
      <Text>{deck.question[index].answer}</Text>
      <InputButton onPress={this.toggleShowAnswer}>Show Question</InputButton>
      <InputButton onPress={() => this.incrementAnswers('correctAnswers')}>Correct</InputButton>
      <InputButton onPress={() => this.incrementAnswers('incorrectAnswers')}>Incorrect</InputButton>
    </View>
  );

  renderScore = () => {
    clearLocalNotification()
      .then(setLocalNotification());
    return (
      <View>
        <Text>Correct Answers: {this.state.correctAnswers}</Text>
        <Text>Incorrect Answers: {this.state.incorrectAnswers}</Text>
        <Text>Total Score: {(this.state.correctAnswers / this.props.deck.question.length * 100).toFixed()}%</Text>
        <TextButton onPress={this.reset}>Take it again!</TextButton>
        <TextButton onPress={() => this.props.navigation.navigate('Deck', { deckId: this.props.deckId })}>Back To Deck</TextButton>
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
      <View> {
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
