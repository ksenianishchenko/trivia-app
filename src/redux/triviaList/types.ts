import TriviaInfoItem from "../../abstractions/api/models/triviaInfoItem"

export type triviaItemsState = {
    triviaItemsList: TriviaInfoItem[]
}

type triviaItemsListAction = {
    type: string,
    payload: TriviaInfoItem[]
}

export type triviaActions = triviaItemsListAction

export type DispatchTypeTrivia = (args: triviaActions) => triviaActions



