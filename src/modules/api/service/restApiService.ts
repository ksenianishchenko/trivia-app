import IApiService from "../../../abstractions/api/service/apiService";
import TriviaInfoItem from "../../../abstractions/api/models/triviaInfoItem";
import TriviaQuestionItem from "../../../abstractions/api/models/triviaQuestionItem";

export default class RestApiService implements IApiService {
    getTriviaQuestion(triviaId: string, questionId: string): TriviaQuestionItem {
        throw new Error("Method not implemented.");
    }
    
    listItems(): TriviaInfoItem[] {
        // http.get('https://api.com/v1/trivia')
        return [];
    }
}