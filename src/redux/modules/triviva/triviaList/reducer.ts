import {ActionTypes} from "./action_types";
import {triviaActions, DispatchTypeTrivia, triviaItemsState} from "./types";
import {setTriviaItemsList} from "./actions";
import IApiService from "../../../../abstractions/api/service/apiService";
import { LocalApiService } from "../../../../modules/api/service/localApiService";

const initialState:triviaItemsState = {
    triviaItemsList: []
};

const apiService: IApiService = new LocalApiService();

const onSetTriviaList = () => {
    return (dispatch: DispatchTypeTrivia) => {
        dispatch(setTriviaItemsList(apiService.listTrivia()));
    }
}

const triviaDataReducer = (state: triviaItemsState = initialState, action: triviaActions) => {
    switch(action.type) {
        case ActionTypes.SET_TRIVIA:
            return {
                ...state,
                triviaItemsList: action.payload
            }
        default:
            return state;
    }
};

export {triviaDataReducer, onSetTriviaList};