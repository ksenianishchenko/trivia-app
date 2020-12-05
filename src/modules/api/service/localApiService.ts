import IApiService from "../../../abstractions/api/service/apiService";
import TriviaInfoItem from "../../../abstractions/api/models/triviaInfoItem";

export class LocalApiService implements  IApiService {
    listItems(): TriviaInfoItem[] {
        const triviaList: TriviaInfoItem[] = [
            {
                id: "1",
                title: "Harry Potter: Hogwarts' Secrets"
            }
        ];

        return triviaList;
    }

    deleteItems(){};
}