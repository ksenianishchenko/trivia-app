import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem"
import TriviaQuestionDefinition from "../../../../abstractions/api/models/triviaQuestionsDefinition"

/// Harry Potter

const harryPotterQuestionsWorkflow = new Map<string, TriviaQuestionDefinition>();

const harryPotterQuestions: TriviaQuestionDefinition = {
    questions: new Map<string, TriviaQuestionItem>()
}

const hpQuestion0 = {
    "$id": "0",
    "type": "object",
    "next": "1",
    "properties": {
        "answers": {
            "$id": "/properties/answers",
            "title": "In the Harry Potter book series, which character had the wand made of a phoenix bird feather?",
            "type": "string",
            "enum": ["Hermione", "Tom Riddle", "Ron", "Professor Snape", "Malfoy"]
        }
    },
    "required": ["answers"]
}

harryPotterQuestions.questions.set("0", hpQuestion0);

const hpQuestion1 = {
    "$id": "1",
    "type": "object",
    "next": "2",
    "properties": {
        "answers": {
            "$id": "/properties/answers",
            "title": "How does Harry first learn that he is a wizard",
            "type": "string",
            "enum": ["The Dursleys tell him when he is eight", "Dudley accidentally lets it slip", "He reads about it in the Daily Prophet", "Hagrid has to track him down to tell him"]
        }
    },
    "required": [
        "answers"
    ]
}

harryPotterQuestions.questions.set("1", hpQuestion1);

const hpQuestion2 = {
    "$id": "2",
    "type": "object",
    "next": "undefined",
    "properties": {
        "answers": {
            "$id": "/properties/answers",
            "title": "How does Harry first learn that he is a wizard",
            "type": "string",
            "enum": ["The Dursleys tell him when he is eight", "Dudley accidentally lets it slip", "He reads about it in the Daily Prophet", "Hagrid has to track him down to tell him"]
        }
    },
    "required": [
        "answers"
    ]
}

harryPotterQuestions.questions.set("2", hpQuestion2);

harryPotterQuestionsWorkflow.set("harry-potter", harryPotterQuestions);

export {harryPotterQuestionsWorkflow};