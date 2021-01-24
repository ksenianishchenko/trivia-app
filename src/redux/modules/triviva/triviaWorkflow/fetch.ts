import apiService from "../../../../services/apiService";
import { AppThunk } from "../../../store";
import { setTriviaCurrentQuestionShema } from "./actions";


const setQuestionSchema = ( triviaId: string, questionId: string ): AppThunk<void> => (dispatch, getState) => {
    dispatch(setTriviaCurrentQuestionShema(apiService.getTriviaQuestion(triviaId, questionId)));
    console.log(apiService.getTriviaQuestion(triviaId, questionId));
}

export {setQuestionSchema};