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

export type TriviaWorkflowActions = triviaQuestionSchemaAction;

export type DispatchTypeTriviaWorkflow = (arg: TriviaWorkflowActions) => TriviaWorkflowActions