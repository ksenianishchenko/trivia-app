type TriviaQuestionItemAnswersChoice = {
    $id: string;
    title: string;
    type: string
    enum: string[];
}


type TriviaQuestionItemProperties = {
    answers: TriviaQuestionItemAnswersChoice;
}

type TriviaQuestionItem = {
    $id: string;
    type: string;
    next: string | undefined;
    properties: TriviaQuestionItemProperties;
    required: string[]
}

export default TriviaQuestionItem;