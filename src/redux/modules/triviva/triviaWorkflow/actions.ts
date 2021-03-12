import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";
import { ActionTypes } from "./actionTypes";

export const setTriviaCurrentQuestionShema = (question: TriviaQuestionItem) => ({
    type: ActionTypes.SET_CURRENT_QUESTION_SCHEMA,
    payload: question
});

export const setTriviaId = (id: string) => ({
    type: ActionTypes.SET_TRIVIA_ID,
    payload: id
});

export const setCorrectAnswers = (answers: []) => ({
    type: ActionTypes.SET_CORRECT_ANSWERS,
    payload: answers
});