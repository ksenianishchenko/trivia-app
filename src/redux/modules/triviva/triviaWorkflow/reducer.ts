import { ActionTypes } from "./actionTypes";
import { TriviaWorkflowActions, triviaWorkflowState } from "./types";

const initialState: triviaWorkflowState = {
    triviaCurrentQuestionSchema: undefined,
    currentTriviaId: "",
    correctAnswers: [],
    isCurrentAnswerCorrect: undefined,
    localScore: 0
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
        case ActionTypes.SET_CORRECT_ANSWERS:
            return {
                ...state,
                correctAnswers: action.payload
            }
        case ActionTypes.SET_CURRENT_ANSWER_STATUS:
            return {
                ...state,
                isCurrentAnswerCorrect: action.payload
            }
        case ActionTypes.SET_LOCAL_SCORE:
            return {
                ...state,
                localScore: state.localScore + 1
            }
        case ActionTypes.RESET_LOCAL_SCORE:
            return {
                ...state,
                localScore: 0
            }
        default:
            return state;
    }
};

export {triviaWorkflowReducer};