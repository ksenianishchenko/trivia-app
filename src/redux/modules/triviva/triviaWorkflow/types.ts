import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";
import WorkflowDefinition from "../../../../abstractions/api/models/workflowDefinition";

export type triviaWorkflowState = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | null,
    triviaCurrentWorkflow: WorkflowDefinition | null
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