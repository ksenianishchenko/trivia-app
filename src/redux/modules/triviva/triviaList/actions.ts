import { TriviaInfoItem } from "../../../../abstractions/api/models/triviaInfoItem";
import {ActionTypes} from "./actionTypes";

export const setTriviaItemsList = (list: TriviaInfoItem[]) => ({
    type: ActionTypes.SET_TRIVIA,
    payload: list
});