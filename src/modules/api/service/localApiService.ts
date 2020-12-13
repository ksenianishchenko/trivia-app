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

// GET /api/trivia/{trivia-id} -- WORKFLOW
// => {startAt: "твой-возраст", states: {"твой-возраст": {"type": "single-trivia-question", "id": "твой-возраст", next: "кто-ты-по-гороскопу"}}}
// GET /api/trivia/{trivia-id}/{trivia-question-id}
// Trivia - на кого ты похож из голливудских звезд
// GET /api/trivia/на-кого-ты-похож/твой-возраст
// {id: "твой-возраст", "title": "Сколько тебе лет", "answers": ["14-18", "19-30", "31-50"]}

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