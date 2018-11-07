import React, { Component } from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import { connect } from 'react-redux';

import InputButton from './InputButton';
import InputText from './InputText';

import { addNewCard } from '../actions';
import { addCardToDeck } from '../utils/api';
import { charcoal, cream } from '../utils/color';
import { global } from '../utils/global';

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
      this.props.navigation.navigate(
        'Deck',
        { deckId: deckId }
      );
    });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={[
          global.darkBackground,
          global.center,
          { padding: 15 },
        ]}>
        <Text style={ global.title }>Create a New Flashcard</Text>
        <InputText
          value={ question }
          handleChange={ (question) => this.setState({ question }) }
          placeholder={ 'Add Your Question' }
          marginBottom={ 15 }/>
        <InputText
          value={ answer }
          handleChange={ (answer) => this.setState({ answer }) }
          placeholder={ 'Add Your Answer' }
          marginBottom={ 30 }/>
        <InputButton
          onPress={ this.addCard }
          isDisabled={ question === 0 || answer.length === 0 }
          backgroundColor={ cream }
          borderColor={ cream }
          color={ charcoal }>
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

export default connect(mapStateToProps)(NewCard);
