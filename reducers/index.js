import { ADD_CARD, ADD_DECK, ADD_STACK } from '../actions';

function stack(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      const updateQuestion = state[action.deckId].questions.concat(action.newCard);
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: updateQuestion,
        },
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case ADD_STACK:
      return {
        ...state,
        ...action.stack,
      };
    default:
      return state;
  }
}

export default stack;
