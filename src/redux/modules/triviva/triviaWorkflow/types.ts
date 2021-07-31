import { TriviaInfoItem } from "../../../../abstractions/api/models/triviaInfoItem";
import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";

export type UserAnswer = {
    [id: string]: string
}

export type triviaWorkflowState = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | undefined,
    currentTriviaId: string | any,
    correctAnswers: string[],
    isCurrentAnswerCorrect: boolean | undefined,
    localScore: number,
    currentTriviaPoster: string,
    currentTriviaItem: TriviaInfoItem | undefined
}

type triviaQuestionSchemaAction = {
    type: string;
    payload: TriviaQuestionItem
}

type currentTriviaIdAction = {
    type: string;
    payload: string | any;
}

type currentTriviaPoster = {
    type: string;
    payload: string;
}

type currentTriviaItem = {
    type: string;
    payload: TriviaInfoItem;
}

export type TriviaWorkflowActions = triviaQuestionSchemaAction | currentTriviaIdAction | currentTriviaPoster | currentTriviaItem;

export type DispatchTypeTriviaWorkflow = (arg: TriviaWorkflowActions) => TriviaWorkflowActions