import {ActionTypes} from "./action_types";
import TriviaInfoItem from "../../../abstractions/api/models/triviaInfoItem";

export const setTriviaItemsList = (list: TriviaInfoItem[]) => ({
    type: ActionTypes.SET_TRIVIA,
    payload: list
});