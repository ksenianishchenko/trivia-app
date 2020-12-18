import IApiService from "../../../abstractions/api/service/apiService";
import { LocalApiService } from "../../../modules/api/service/localApiService";
import { setTriviaCurrentQuestionShema } from "./actions";
import { ActionTypes } from "./action_types";
import { DispatchTypeTriviaQuestion, TriviaQuestionActions, triviaQuestionsState } from "./types";

const initialState: triviaQuestionsState = {
    triviaCurrentQuestionSchema: null
};

const apiService: IApiService = new LocalApiService();

const setQuestionSchema = (triviaId: string, questionId: string) => {
    return (dispatch: DispatchTypeTriviaQuestion) => {
        dispatch(setTriviaCurrentQuestionShema(apiService.getTriviaQuestion(triviaId, questionId)))
    }
}

const triviaQuestionReducer = (state: triviaQuestionsState = initialState, action: TriviaQuestionActions) => {
    switch(action.type) {
        case ActionTypes.SET_CURRENT_QUESTION_SCHEMA:
            return {
                ...state,
                triviaCurrentQuestionSchema: action.payload
            }
        default:
            return state;
    }
};

export {triviaQuestionReducer, setQuestionSchema};