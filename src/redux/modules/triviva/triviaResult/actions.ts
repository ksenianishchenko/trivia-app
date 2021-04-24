import { ActionTypes } from "./actionTypes";

export const setUserTotalAnswers = (total: number) => ({
  type: ActionTypes.SET_CORRECT_ANSWERS_TOTAL,
  payload: total
});