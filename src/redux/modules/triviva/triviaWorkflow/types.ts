import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";

export type triviaWorkflowState = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | undefined,
    currentTriviaId: string | any
}

type triviaQuestionSchemaAction = {
    type: string;
    payload: TriviaQuestionItem
}

export type TriviaWorkflowActions = triviaQuestionSchemaAction;

export type DispatchTypeTriviaWorkflow = (arg: TriviaWorkflowActions) => TriviaWorkflowActions