import apiService from "../../../../services/apiService";
import { AppThunk } from "../../../store";


const setQuestionSchema = ( triviaId: string, questionId: string ): AppThunk<void> => (dispatch, getState) => {
    apiService.getTriviaQuestion(triviaId, questionId, dispatch);
}

const setCorrectAnswers = ( triviaId: string, questionId: string ): AppThunk<void> => (dispatch, getState) => {
    apiService.getCorrectAnswers(triviaId, questionId, dispatch);
}

export {setQuestionSchema, setCorrectAnswers};