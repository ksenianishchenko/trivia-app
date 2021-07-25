import IApiService from "../../../abstractions/api/service/apiService";
import TriviaQuestionItem from "../../../abstractions/api/models/triviaQuestionItem";
import WorkflowDefinition from "../../../abstractions/workflow/workflowDefinition";
import {harryPotterWorkflow} from "../../trivia/mockdata/workflowCreator";
import { QuestionsWorkflow } from "../../trivia/mockdata/triviaQuestionsCreator/index";
import trivia from "../../trivia/mockdata/trivia";
import { TriviaInfoItem } from "../../../abstractions/api/models/triviaInfoItem";
import { setTriviaItemsList } from "../../../redux/modules/triviva/triviaList/actions";
import { setCurrentPath, setCurrentStepId, setWorkflowDefinition } from "../../../redux/workflow/actions";
import { setTriviaCurrentQuestionShema } from "../../../redux/modules/triviva/triviaWorkflow/actions";

// GET /api/trivia/{trivia-id} -- WORKFLOW
// => {startAt: "твой-возраст", states: {"твой-возраст": {"type": "single-trivia-question", "id": "твой-возраст", next: "кто-ты-по-гороскопу"}}}
// GET /api/trivia/{trivia-id}/{trivia-question-id}
// Trivia - на кого ты похож из голливудских звезд
// GET /api/trivia/на-кого-ты-похож/твой-возраст
// {id: "твой-возраст", "title": "Сколько тебе лет", "answers": ["14-18", "19-30", "31-50"]}

export class LocalApiService implements IApiService {
    listTrivia(dispatch: any): TriviaInfoItem[] {
        const triviaList: TriviaInfoItem[] = [];

        trivia.results.map((item) => {
            return triviaList.push({
                id: item.id,
                title: item.title,
                poster: item.properties.background
            })
        })
        dispatch(setTriviaItemsList(triviaList));

        return triviaList;
    }

    getTriviaWorkflow(triviaId: string, dispatch: any): WorkflowDefinition {
        dispatch(setWorkflowDefinition(harryPotterWorkflow));
        dispatch(setCurrentStepId(harryPotterWorkflow.startAt));
        dispatch(setCurrentPath(undefined));
        return harryPotterWorkflow;
    }

    getTriviaQuestion(triviaId: string, questionId: string, dispatch: any): TriviaQuestionItem {
        const currentTriviaQuestions = QuestionsWorkflow.get(triviaId);
        let questionSchema: any = undefined;
        if (currentTriviaQuestions) {
            questionSchema = currentTriviaQuestions.questions.get(questionId);
            dispatch(setTriviaCurrentQuestionShema(questionSchema));
        }

        if (!questionSchema) {
            throw Error("404 Not found");
        }

        return questionSchema;
    }

    getCorrectAnswers(triviaId: string, questionId: string, dispatch: any): [] {
        return [];
    }

    getTriviaScore(triviaId: string, dispatch: any): void {
        console.log("Trivia Score");
    }
}