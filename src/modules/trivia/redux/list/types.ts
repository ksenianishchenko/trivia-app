export interface ITriviaItem {
    question: string
    answers: string[]
    correct: string
}

interface ITriviaCategory {
    id: number
    category: string[]
    title: string
}

export interface ITriviaItemsList {
    triviaQuestionsList: ITriviaItem[]
}

export interface ITriviaItemsListAction {
    type: string,
    payload: ITriviaItem[]
}

export type DispatchType = (args: ITriviaItemsListAction) => ITriviaItemsListAction



