export type TriviaQuestionItemAnswersChoice = {
    id: string;
    text: string;
    imageUrl: string;
}

type TriviaQuestionItem = {
    id: string;
    title: string;
    questionText: string,
    type: string;
    next: string | undefined;
    answers: TriviaQuestionItemAnswersChoice[];
    required: string[]
}

export default TriviaQuestionItem;