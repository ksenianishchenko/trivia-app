import IApiService from "../../../abstractions/api/service/apiService";
import TriviaInfoItem from "../../../abstractions/api/models/triviaInfoItem";
import TriviaQuestionItem from "../../../abstractions/api/models/triviaQuestionItem";

const trivia = {
    results: [
        {
            id: "harry-potter",
            title: "Harry Potter"
        },
        {
            id: "star-wars-death-star",
            title: "Star Wars: All About The Death Star"
        },
        {
            id: "blow-your-mind",
            title: "Fun Facts: Blow your mind"
        }
    ]
}

const allQuestions: { [name: string]: {[name: string]: TriviaQuestionItem} } = {
    "harry-potter": {
        "0": {
            "$id": "0",
            "type": "object",
            "next": "1",
            "properties": {
                "answers": {
                    "$id": "/properties/answers",
                    "title": "In the Harry Potter book series, which character had the wand made of a phoenix bird feather?",
                    "type": "string",
                    "enum": ["Hermione", "Tom Riddle", "Ron", "Professor Snape", "Malfoy"]
                }
            },
            "required": ["answers"]
        },
        "1": {
            "$id": "1",
            "type": "object",
            "next": "2",
            "properties": {
                "answers": {
                    "$id": "/properties/answers",
                    "title": "How does Harry first learn that he is a wizard",
                    "type": "string",
                    "enum": ["The Dursleys tell him when he is eight", "Dudley accidentally lets it slip", "He reads about it in the Daily Prophet", "Hagrid has to track him down to tell him"]
                }
            },
            "required": [
                "answers"
            ]
        },
        "2": {
            "$id": "2",
            "type": "object",
            "next": "results",
            "properties": {
                "answers": {
                    "$id": "/properties/answers",
                    "title": "Who is Fluffy",
                    "type": "string",
                    "enum": [ "Hagrid’s dragon", "Harry’s owl", "Hagrid’s three-headed dog", "Dumbledore’s pet snake" ]
                }
            },
            "required": [
                "answers"
            ]
        }
    }
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

    getTriviaQuestion(triviaId: string, questionId: string): TriviaQuestionItem {

        const trivia = allQuestions[triviaId];
        let questionSchema: any = undefined;
        if (trivia) {
            questionSchema = trivia[questionId];
        }

        if (!questionSchema) {
            throw Error("404 Not found");
        }

        return questionSchema;
    }
}