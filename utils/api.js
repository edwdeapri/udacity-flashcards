import { AsyncStorage } from 'react-native';

import { STACK_STORAGE_KEY, createDeck } from './helpers';

export const addCardToDeck = async (deckTitle, newCard) => {
    try { AsyncStorage.getItem(STACK_STORAGE_KEY)
      .then(data => {
        const stack = JSON.parse(data);
        const updateQuestion = stack[deckTitle].question.concat([newCard]);
        const createdDeck = createDeck(deckTitle, updateQuestion);
        AsyncStorage.mergeItem(STACK_STORAGE_KEY, JSON.stringify(createdDeck));
        return createdDeck;
      });
    } catch (error) {
      console.warn('Error Adding Flashcard to Deck: ', error);
    }
  };

export const saveTitleOfDeck = async (deckTitle) => {
  const createdDeck = createDeck(deckTitle);
  try {
    AsyncStorage.mergeItem(STACK_STORAGE_KEY, JSON.stringify(createdDeck));
    return createdDeck;
  } catch (error) {
    console.warn('Error Adding Deck to Stack: ', error);
  }
};

export const getDeckFromStack = async (id) => {
  try {
    AsyncStorage.getItem(STACK_STORAGE_KEY)
      .then(data => {
        const stack = JSON.parse(data);
        return typeof id === 'undefined'
        ? stack
        : stack[id];
      });
  } catch (error) {
    console.warn('Error Getting Deck from Stack: ', error);
  }
};
