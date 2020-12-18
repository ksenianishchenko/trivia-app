import TriviaQuestionItem from "../../../abstractions/api/models/triviaQuestionItem";

export type triviaQuestionsState = {
    triviaCurrentQuestionShema: TriviaQuestionItem | null
}

type triviaQuestionShemaAction = {
    type: string;
    payload: TriviaQuestionItem
}


export type TriviaQuestionActions = triviaQuestionShemaAction;