import TriviaInfoItem from "../models/triviaInfoItem";
import TriviaQuestionItem from "../models/triviaQuestionItem";

export default interface IApiService {
    listItems(): TriviaInfoItem[];
    getTriviaQuestion(triviaId: string, questionId: string): TriviaQuestionItem;
}