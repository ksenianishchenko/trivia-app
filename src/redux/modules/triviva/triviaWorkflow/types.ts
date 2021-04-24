import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";

export type UserAnswer = {
    [id: string]: string
}

export type triviaWorkflowState = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | undefined,
    currentTriviaId: string | any,
    correctAnswers: string[]
}

type triviaQuestionSchemaAction = {
    type: string;
    payload: TriviaQuestionItem
}

type currentTriviaIdAction = {
    type: string;
    payload: string | any;
}

export type TriviaWorkflowActions = triviaQuestionSchemaAction | currentTriviaIdAction;

export type DispatchTypeTriviaWorkflow = (arg: TriviaWorkflowActions) => TriviaWorkflowActions