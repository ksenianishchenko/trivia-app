import IApiService from "../../../abstractions/api/service/apiService";
import TriviaInfoItem from "../../../abstractions/api/models/triviaInfoItem";

export default class RestApiService implements IApiService {
    listItems(): TriviaInfoItem[] {
        return [];
    }

    helloWorld(): void {
    }
}