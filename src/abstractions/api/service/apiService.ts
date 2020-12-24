import TriviaInfoItem from "../models/triviaInfoItem";
import TriviaQuestionItem from "../models/triviaQuestionItem";
import WorkflowDefinition from "../models/workflowDefinition";

export default interface IApiService {
    listTrivia(): TriviaInfoItem[];
    getTriviaWorkflow(triviaId: string): WorkflowDefinition;
    getTriviaQuestion(triviaId: string, questionId: string): TriviaQuestionItem;
}