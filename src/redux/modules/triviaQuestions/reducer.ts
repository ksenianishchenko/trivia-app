import IApiService from "../../../abstractions/api/service/apiService";
import { LocalApiService } from "../../../modules/api/service/localApiService";
import { ActionTypes } from "./action_types";
import { TriviaQuestionActions, triviaQuestionsState } from "./types";

const initialState: triviaQuestionsState = {
    triviaCurrentQuestionShema: null
};

const apiService: IApiService = new LocalApiService();

const triviaQuestionReducer = (state: triviaQuestionsState = initialState, action: TriviaQuestionActions) => {
    switch(action.type) {
        case ActionTypes.SET_CURRENT_QUESTION_SHEMA:
            return {
                ...state,
                triviaCurrentQuestionShema: action.payload
            }
        default:
            return state;
    }
};

export {triviaQuestionReducer};