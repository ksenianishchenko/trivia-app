import TriviaQuestionItem from "../../../abstractions/api/models/triviaQuestionItem";

export type triviaQuestionsState = {
    triviaCurrentQuestionSchema: TriviaQuestionItem | null
}

type triviaQuestionSchemaAction = {
    type: string;
    payload: TriviaQuestionItem
}

export type TriviaQuestionActions = triviaQuestionSchemaAction;

export type DispatchTypeTriviaQuestion = (arg: TriviaQuestionActions) => TriviaQuestionActions