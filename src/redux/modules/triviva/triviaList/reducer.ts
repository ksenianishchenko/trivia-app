import {ActionTypes} from "./actionTypes";
import {triviaActions, triviaItemsState} from "./types";

const initialState:triviaItemsState = {
    triviaItemsList: undefined
};

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

export {triviaDataReducer};