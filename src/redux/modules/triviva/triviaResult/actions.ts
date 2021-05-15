import { ActionTypes } from "./actionTypes";

export const setScore = (score: number) => ({
  type: ActionTypes.SET_CORRECT_ANSWERS_TOTAL,
  payload: score
});