import {ActionTypes} from "./action_types";
import {triviaActions, DispatchTypeTrivia, triviaItemsState} from "./types";
import {setTriviaItemsList} from "./actions";
import {AnyAction} from "redux";
import IApiService from "../../../../abstractions/api/service/apiService";
import { LocalApiService } from "../../../api/service/localApiService";

const initialState:triviaItemsState = {
    triviaItemsList: []
};

const trivia = {
    results: [
        {
            id: "1",
            title: "Harry Potter: Hogwarts' Secrets"
        },
        {
            id: "56",
            title: "Star Wars: All about the Light Sabres"
        },
        {
            id: "58",
            title: "Star Wars: All About The Death Star"
        },
        {
            id: "45",
            title: "Fun Facts: Traditions of Native Uzbeks"
        }
    ]
}

const apiService: IApiService = new LocalApiService();

const onSetTriviaList = () => {
    return (dispatch: DispatchTypeTrivia) => {
        dispatch(setTriviaItemsList(trivia.results));
    }
}

const triviaDataReducer = (state: triviaItemsState = initialState, action: triviaActions) => {
    switch(action.type) {
        case ActionTypes.SET_TRIVIA_QUESTIONS:
            return {
                ...state,
                triviaItemsList: action.payload
            }
        default:
            return state;
    }
};

export {triviaDataReducer, onSetTriviaList};