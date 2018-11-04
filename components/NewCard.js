import React, { Component } from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import { connect } from 'react-redux';

import InputButton from './InputButton';
import InputText from './InputText';

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
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

export default NewCard;
