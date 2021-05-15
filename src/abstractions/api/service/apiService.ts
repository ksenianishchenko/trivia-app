import TriviaQuestionItem from "../models/triviaQuestionItem";
import WorkflowDefinition from "../../workflow/workflowDefinition";
import { TriviaInfoItem } from "../models/triviaInfoItem";

export default interface IApiService {
    listTrivia(dispatch: any): TriviaInfoItem[];
    getTriviaWorkflow(triviaId: string, dispatch: any): WorkflowDefinition;
    getTriviaQuestion(triviaId: string, questionId: string, dispatch: any): TriviaQuestionItem | void;
    getCorrectAnswers(triviaId: string, questionId: string, answers: string[], dispatch: any): [] | void;
    getTriviaScore(triviaId: string, dispatch: any): void;
}