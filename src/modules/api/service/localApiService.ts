import IApiService from "../../../abstractions/api/service/apiService";
import TriviaInfoItem from "../../../abstractions/api/models/triviaInfoItem";
import TriviaQuestionItem from "../../../abstractions/api/models/triviaQuestionItem";
import WorkflowDefinition from "../../../abstractions/api/models/workflowDefinition";
import {harryPotterWorkflow} from "../../helpers/workflowCreator";
import { harryPotterQuestionsWorkflow } from "../../helpers/triviaQuestionsCreator";


const trivia = {
    results: [
        {
            id: "harry-potter",
            title: "Harry Potter",
            properties: {
                background: "url(./resourses/harry-potter.jpg)"
            }
        },
        {
            id: "star-wars-death-star",
            title: "Star Wars: All About The Death Star",
            properties: {
                background: "url(./resourses/star-wars.jpg)"
            }
        },
        {
            id: "blow-your-mind",
            title: "Fun Facts: Blow your mind",
            properties: {
                background: "url(./resourses/white-pink-blue.jpg)"
            }
        }
    ]
}

// GET /api/trivia/{trivia-id} -- WORKFLOW
// => {startAt: "твой-возраст", states: {"твой-возраст": {"type": "single-trivia-question", "id": "твой-возраст", next: "кто-ты-по-гороскопу"}}}
// GET /api/trivia/{trivia-id}/{trivia-question-id}
// Trivia - на кого ты похож из голливудских звезд
// GET /api/trivia/на-кого-ты-похож/твой-возраст
// {id: "твой-возраст", "title": "Сколько тебе лет", "answers": ["14-18", "19-30", "31-50"]}

export class LocalApiService implements IApiService {
    listTrivia(): TriviaInfoItem[] {
        const triviaList: TriviaInfoItem[] = [];

        trivia.results.map((item) => {
            return triviaList.push({
                id: item.id,
                title: item.title,
                properties: item.properties
            })
        })

        return triviaList;
    }

    getTriviaWorkflow(triviaId: string): WorkflowDefinition {
        return harryPotterWorkflow;
    }

    getTriviaQuestion(triviaId: string, questionId: string): TriviaQuestionItem {
        const currentTriviaQuestions = harryPotterQuestionsWorkflow.get(triviaId);
        let questionSchema: any = undefined;
        if (currentTriviaQuestions) {
            questionSchema = currentTriviaQuestions.questions.get(questionId);
        }

        if (!questionSchema) {
            throw Error("404 Not found");
        }

        return questionSchema;
    }
}