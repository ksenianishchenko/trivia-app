import TriviaInfoItem from "../models/triviaInfoItem";

export default interface IApiService {
    listItems(): TriviaInfoItem[];
}