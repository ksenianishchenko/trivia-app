import IApiService from "../../../../abstractions/api/service/apiService";
import { RestApiService } from "../../../../modules/api/service/restApiService";
import { AppThunk } from "../../../store";
import { DispatchTypeTrivia } from "./types";

const apiService: IApiService = new RestApiService();

const onSetTriviaList = ():AppThunk<void> => {
    return (dispatch: DispatchTypeTrivia) => {
        apiService.listTrivia(dispatch);
    }
}

export {onSetTriviaList};
