import IApiService from "../../../abstractions/api/service/apiService";
import TriviaInfoItem from "../../../abstractions/api/models/triviaInfoItem";

const trivia = {
    results: [
        {
            id: "1",
            title: "Harry Potter: Hogwarts' Secrets"
        },
        {
            id: "56",
            title: "Star Wars: All about the Light Sabres"
        },
        {
            id: "58",
            title: "Star Wars: All About The Death Star"
        },
        {
            id: "45",
            title: "Fun Facts: Traditions of Native Uzbeks"
        }
    ]
}

export class LocalApiService implements  IApiService {
    listItems(): TriviaInfoItem[] {
        const triviaList: TriviaInfoItem[] = [];

        trivia.results.map((item) => {
            return triviaList.push({
                id: item.id,
                title: item.title
            })
        })

        return triviaList;
    }
}