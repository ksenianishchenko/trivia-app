import IApiService from "../../../abstractions/api/service/apiService";
import TriviaQuestionItem from "../../../abstractions/api/models/triviaQuestionItem";
import WorkflowDefinition from "../../../abstractions/workflow/workflowDefinition";
import {harryPotterWorkflow} from "../../trivia/mockdata/workflowCreator";
import { QuestionsWorkflow } from "../../trivia/mockdata/triviaQuestionsCreator/index";
import API from "./api";
import { TriviaInfoItem } from "../../../abstractions/api/models/triviaInfoItem";

type RecordItemType = {
    id: string;
    title: string;
}

type TriviaItemType = {
    primmary_key: string;
    secondary_key: string;
    record: RecordItemType;
}

export class RestApiService implements IApiService {
    listTrivia(): TriviaInfoItem[] {

        const triviaList: TriviaInfoItem[] = [];
        
        API.get(`/v1/trivia`).then((response) => {
            const parsedData = JSON.parse(response.data.body);
            const list = parsedData;
            list.map((item: TriviaItemType) => {
                return triviaList.push({
                    id: item.record.id,
                    title: item.record.title,
                });
            });

            return triviaList;
        }).catch((error) => {
            console.error(error);
        });

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