import { ActionTypes } from "./actionTypes";
import { TriviaWorkflowActions, triviaWorkflowState } from "./types";

const initialState: triviaWorkflowState = {
    triviaCurrentQuestionSchema: undefined,
    currentTriviaId: null
};

const triviaWorkflowReducer = (state: triviaWorkflowState = initialState, action: TriviaWorkflowActions) => {
    switch(action.type) {
        case ActionTypes.SET_CURRENT_QUESTION_SCHEMA:
            return {
                ...state,
                triviaCurrentQuestionSchema: action.payload
            }
        case ActionTypes.SET_TRIVIA_ID:
            return {
                ...state,
                currentTriviaId: action.payload
            }
        default:
            return state;
    }
};

export {triviaWorkflowReducer};