import IApiService from "../../../../abstractions/api/service/apiService";
import { LocalApiService } from "../../../../modules/api/service/localApiService";
import { setTriviaCurrentQuestionShema, setTriviaCurrentWorkflow } from "./actions";
import { ActionTypes } from "./action_types";
import { DispatchTypeTriviaWorkflow, TriviaWorkflowActions, triviaWorkflowState } from "./types";

const initialState: triviaWorkflowState = {
    triviaCurrentQuestionSchema: null,
    triviaCurrentWorkflow: null,
    currentTriviaId: null
};

const apiService: IApiService = new LocalApiService();

const setQuestionSchema = (triviaId: string, questionId: string) => {
    return (dispatch: DispatchTypeTriviaWorkflow) => {
        dispatch(setTriviaCurrentQuestionShema(apiService.getTriviaQuestion(triviaId, questionId)))
    }
}

const setCurrentWorkflow = (triviaId: string) => {
    return (dispatch: DispatchTypeTriviaWorkflow) => {
        dispatch(setTriviaCurrentWorkflow(apiService.getTriviaWorkflow(triviaId)))
    }
}

const triviaWorkflowReducer = (state: triviaWorkflowState = initialState, action: TriviaWorkflowActions) => {
    switch(action.type) {
        case ActionTypes.SET_CURRENT_QUESTION_SCHEMA:
            return {
                ...state,
                triviaCurrentQuestionSchema: action.payload
            }
        case ActionTypes.SET_CURRENT_WORKFLOW:
            return {
                ...state,
                triviaCurrentWorkflow: action.payload
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

export {triviaWorkflowReducer, setQuestionSchema, setCurrentWorkflow};