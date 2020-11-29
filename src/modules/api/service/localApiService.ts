import IApiService from "../../../abstractions/api/service/apiService";
import TriviaInfoItem from "../../../abstractions/api/models/triviaInfoItem";

export class LocalApiService implements  IApiService {
    listItems(): TriviaInfoItem[] {
        const trivia = new TriviaInfoItem();
        return [trivia];
    }
}