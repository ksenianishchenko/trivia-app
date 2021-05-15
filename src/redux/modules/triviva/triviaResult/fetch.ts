import { AppThunk } from "../../../store";
import apiService from "../../../../services/apiService";

const setTriviaScore = ( triviaId: string ): AppThunk<void> => (dispatch, getState) => {
  apiService.getTriviaScore(triviaId, dispatch);
}

export {setTriviaScore};