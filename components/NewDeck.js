import React, { Component } from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import { connect } from 'react-redux';

import InputButton from './InputButton';
import InputText from './InputText';

import { addNewDeck } from '../actions';
import { saveTitleOfDeck } from '../utils/api';

class NewDeck extends Component {
  state = {
    title: '',
  };

  addDeck = () => {
    const newDeckTitle = this.state.title;
    saveTitleOfDeck(newDeckTitle)
      .then((createdDeck) => {
        this.props.dispatch(addNewDeck(createdDeck));
        this.setState(() => ({
          title: '',
        }));
        this.props.navigation.navigate(
          'Deck',
          { deckId: newDeckTitle }
        );
      });
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <Text>
          Create a New Flashcard Deck
        </Text>
        <InputText
          handleChange={(title) => this.setState({ title })}
          placeholder={'What is the Title of your Deck?'}
          value={this.state.title}/>
        <InputButton
          isDisabled={this.state.title.length === 0}
          onPress={this.addDeck}>
          Add Deck
        </InputButton>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewDeck);
