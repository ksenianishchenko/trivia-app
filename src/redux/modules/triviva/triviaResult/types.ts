export type triviaResultState = {
  correctAnswersTotal: number
}

type triviaTotalResultAction = {
  type: string;
  payload: number;
}

export type TriviaResultActions = triviaTotalResultAction;