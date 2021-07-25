import IApiService from "../../../abstractions/api/service/apiService";
import WorkflowDefinition from "../../../abstractions/workflow/workflowDefinition";
import API from "./api";
import { TriviaInfoItem } from "../../../abstractions/api/models/triviaInfoItem";
import { setTriviaItemsList } from "../../../redux/modules/triviva/triviaList/actions";
import { setCurrentPath, setCurrentStepId, setTotalQuestions, setWorkflowDefinition } from "../../../redux/workflow/actions";
import WorkflowStep from "../../../abstractions/workflow/workflowStep";
import { setCorrectAnswers, setCurrentAnswerStatus, setLocalScore, setTriviaCurrentQuestionShema } from "../../../redux/modules/triviva/triviaWorkflow/actions";
import { setScore } from "../../../redux/modules/triviva/triviaResult/actions";

type RecordItemType = {
    id: string;
    title: string;
    poster: string;
}

type TriviaItemType = {
    primmary_key: string;
    secondary_key: string;
    record: RecordItemType;
}

export class RestApiService implements IApiService {
    listTrivia(dispatch: any): TriviaInfoItem[] {

        let triviaList: TriviaInfoItem[] = [];
        
        API.get(`/v1/trivia`).then((response) => {
            const list = response.data;
            triviaList = list.map((item: TriviaItemType) => {
                return {
                    id: item.record.id,
                    title: item.record.title,
                    poster: item.record.poster
                };
            });

            dispatch(setTriviaItemsList(triviaList));
            
        }).catch((error) => {
            console.error(error);
        });

        return triviaList;
    }

    getTriviaWorkflow(triviaId: string, dispatch: any): WorkflowDefinition {
        let workflow: WorkflowDefinition = {
            startAt: "0",
            steps: new Map<string, WorkflowStep>()
        };

        API.get(`/v1/trivia/${triviaId}`).then((response) => {
            workflow = response.data;
            let totalQuestions = Object.keys(workflow.steps).length - 1

            dispatch(setWorkflowDefinition(workflow));
            dispatch(setCurrentStepId(workflow.startAt));
            dispatch(setCurrentPath(undefined));
            dispatch(setTotalQuestions(totalQuestions));

        }).catch((error) => {
            console.error(error);
        });

        return workflow;
    }

    getTriviaQuestion(triviaId: string, questionId: string, dispatch: any): void{
        
        API.get(`/v1/trivia/${triviaId}/${questionId}`).then((response) => {
            let questionSchema: any = undefined;
            questionSchema = response.data;

            dispatch(setTriviaCurrentQuestionShema(questionSchema));

        }).catch((error) => {
            console.error(error);
        });
    }

    getCorrectAnswers(triviaId: string, questionId: string, answers: string[], dispatch: any): void {

        API.post(`/v1/trivia/${triviaId}/${questionId}`, {data: answers}).then((response) => {
            dispatch(setCorrectAnswers(response.data.correctAnswers));

            if (response.data.isCorrectAnswer === true) {
                dispatch(setCurrentAnswerStatus(true));
                dispatch(setLocalScore());
            } else {
                dispatch(setCurrentAnswerStatus(false));
            }

        }).catch((error) => {
            console.error(error);
        });
    }

    getTriviaScore(triviaId: string, dispatch: any): void {

        API.get(`/v1/trivia/scores/${triviaId}`).then((response) => {
            let data = response.data;
            dispatch(setScore(data.score));

        }).catch((error) => {
            console.error(error);
        });

    }
}