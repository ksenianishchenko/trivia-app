import { ActionTypes } from "./actionTypes";
import { TriviaResultActions, triviaResultState } from "./types";

const initialState: triviaResultState = {
  correctAnswersTotal: 0
};

const triviaResultReducer = (state: triviaResultState = initialState, action: TriviaResultActions) => {
  switch(action.type) {
      case ActionTypes.SET_CORRECT_ANSWERS_TOTAL:
          return {
              ...state,
              correctAnswersTotal: action.payload
          }
      default:
          return state;
  }
};

export {triviaResultReducer};