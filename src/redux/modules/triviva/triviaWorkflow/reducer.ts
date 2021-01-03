import IApiService from "../../../../abstractions/api/service/apiService";
import { LocalApiService } from "../../../../modules/api/service/localApiService";
import { setTriviaCurrentQuestionShema } from "./actions";
import { ActionTypes } from "./actionTypes";
import { DispatchTypeTriviaWorkflow, TriviaWorkflowActions, triviaWorkflowState } from "./types";

const initialState: triviaWorkflowState = {
    triviaCurrentQuestionSchema: null,
    currentTriviaId: null
};

const apiService: IApiService = new LocalApiService();

const setQuestionSchema = (triviaId: string, questionId: string) => {
    return (dispatch: DispatchTypeTriviaWorkflow) => {
        dispatch(setTriviaCurrentQuestionShema(apiService.getTriviaQuestion(triviaId, questionId)))
    }
}

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

export {triviaWorkflowReducer, setQuestionSchema};