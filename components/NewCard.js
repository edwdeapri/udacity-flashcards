import React, { Component } from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import { connect } from 'react-redux';

import InputButton from './InputButton';
import InputText from './InputText';

import { addNewCard } from '../actions';

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  };

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return {
      title: deckId,
    };
  };

  addCard = () => {
    const { deckId } = this.props;
    const newCard = this.state;

    addCardToDeck(deckId, newCard)
    .then(() => {
      this.props.dispatch(addNewCard(deckId, newCard));
      this.setState(() => ({
        question: '',
        answer: '',
      }));
    });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <Text>Create a New Flashcard</Text>
        <InputText
          handleChange={(question) => this.setState({ question })}
          placeholder={'Add Your Question'}
          value={question}/>
        <InputText
          handleChange={(answer) => this.setState({ answer })}
          placeholder={'Add Your Answer'}
          value={answer}/>
        <InputButton
          isDisabled={question === 0 || answer.length === 0}
          onPress={this.addCard}>
          Add Flashcard
        </InputButton>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(stat, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
  };
}

export default connect(NewCard);
