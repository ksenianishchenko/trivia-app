import TriviaQuestionItem from "../../../abstractions/api/models/triviaQuestionItem";
import { ActionTypes } from "./action_types";

export const setTriviaCurrentQuestionShema = (question: TriviaQuestionItem) => ({
    type: ActionTypes.SET_CURRENT_QUESTION_SCHEMA,
    payload: question
});