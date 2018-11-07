import React, { Component } from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import { connect } from 'react-redux';

import InputButton from './InputButton';
import InputText from './InputText';

import { addNewDeck } from '../actions';
import { saveTitleOfDeck } from '../utils/api';
import { cream, tan } from '../utils/color';
import { global } from '../utils/global';

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
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={[
          global.darkBackground,
          global.center,
          { padding: 15 },
        ]}>
        <Text style={[
            global.subHeader,
            { color: cream,
              marginBottom: 40,
            },
          ]}>
          Create a New Flashcard Deck
        </Text>
        <InputText
          handleChange={ (title) => this.setState({ title }) }
          placeholder={ 'What is the Title of your Deck?' }
          marginBottom={ 40 }
          value={ this.state.title }/>
        <InputButton
          onPress={ this.addDeck }
          isDisabled={ this.state.title.length === 0 }
          borderColor={ tan }
          color={ tan }>
          Add Deck
        </InputButton>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewDeck);
