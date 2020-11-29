import {ITriviaItem} from "./types";
import {ActionTypes} from "./action_types";

export const setTriviaItemsList = (list: ITriviaItem[]) => ({
    type: ActionTypes.SET_TRIVIA_QUESTIONS,
    payload: list
});