import IApiService from "../../../abstractions/api/service/apiService";
import TriviaInfoItem from "../../../abstractions/api/models/triviaInfoItem";
import TriviaQuestionItem from "../../../abstractions/api/models/triviaQuestionItem";
import WorkflowDefinition from "../../../abstractions/workflow/workflowDefinition";
import {harryPotterWorkflow} from "../../trivia/mockdata/workflowCreator";
import { QuestionsWorkflow } from "../../trivia/mockdata/triviaQuestionsCreator/index";
import trivia from "../../trivia/mockdata/trivia";

export class RestApiService implements IApiService {
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
        const currentTriviaQuestions = QuestionsWorkflow.get(triviaId);
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