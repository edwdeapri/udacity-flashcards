import { AsyncStorage } from 'react-native';

export const STACK_STORAGE_KEY = 'Flashcards:stack';

export function createDeck(deckTitle, question) {
  return {
    [deckTitle]: {
      title: deckTitle,
      question: question ? question : [],
    },
  };
}
