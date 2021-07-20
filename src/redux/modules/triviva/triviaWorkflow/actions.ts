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

export const setCurrentAnswerStatus = (status: boolean) => ({
    type: ActionTypes.SET_CURRENT_ANSWER_STATUS,
    payload: status
});

export const setLocalScore = () => ({
    type: ActionTypes.SET_LOCAL_SCORE
});

export const resetLocalScore = () => ({
    type: ActionTypes.RESET_LOCAL_SCORE
});
