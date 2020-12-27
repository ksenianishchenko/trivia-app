import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";
import WorkflowDefinition from "../../../../abstractions/workflow/workflowDefinition";

export type triviaWorkflowState = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | any,
    triviaCurrentWorkflow: WorkflowDefinition | any,
    currentTriviaId: string | any
}

type triviaQuestionSchemaAction = {
    type: string;
    payload: TriviaQuestionItem
}

type triviaWorkflowAction = {
    type: string;
    payload: WorkflowDefinition
}

export type TriviaWorkflowActions = triviaQuestionSchemaAction | triviaWorkflowAction;

export type DispatchTypeTriviaWorkflow = (arg: TriviaWorkflowActions) => TriviaWorkflowActions