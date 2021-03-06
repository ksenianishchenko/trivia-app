import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem"
import TriviaQuestionDefinition from "../../../../abstractions/api/models/triviaQuestionsDefinition"

/// Harry Potter

//{
//    "harry-potter": {
//        questions: {
//                "0": {"$id": "0",
    //                "type": "object",
    //                "next": "1",
    //                "properties": {
    //                    "answers": {
    //                        "$id": "/properties/answers",
    //                        "title": "In the Harry Potter book series, which character had the wand made of a phoenix bird feather?",
    //                        "type": "single",
    //                        "enum": ["Hermione", "Tom Riddle", "Ron", "Professor Snape", "Malfoy"]
    //                    }
    //                },
    //                "required": ["answers"]}
    //            },
//            "1": {
//                "$id": "1",
//                "type": "object",
//                "next": "2",
//                "properties": {
//                    "answers": {
//                        "$id": "/properties/answers",
//                        "title": "How does Harry first learn that he is a wizard",
//                        "type": "string",
//                        "enum": ["The Dursleys tell him when he is eight", "Dudley accidentally lets it slip", "He reads about it in the Daily Prophet", "Hagrid has to track him down to tell him"]
//                    }
//                },
//                "required": [
//                    "answers"
//                ]
//            },
//            "2": {
//                "$id": "2",
//                "type": "object",
//                "next": "undefined",
//                "properties": {
//                    "answers": {
//                        "$id": "/properties/answers",
//                        "title": "How does Harry first learn that he is a wizard",
//                        "type": "string",
//                        "enum": ["The Dursleys tell him when he is eight", "Dudley accidentally lets it slip", "He reads about it in the Daily Prophet", "Hagrid has to track him down to tell him"]
//                    }
//                },
//                "required": [
//                    "answers"
//                ]
//            }
//    }
//}

const hpQuestion0 = {
    "id": "0",
    "title": "Harry Potter book",
    "questionText": "In the Harry Potter book series, which character had the wand made of a phoenix bird feather?",
    "type": "single",
    "next": "1",
    "answers": [
        {
            "id": "0",
            "text": "Hermione",
            "imageUrl": ""
        },
        {
            "id": "1",
            "text": "Tom Riddle",
            "imageUrl": ""
        },
        {
            "id": "2",
            "text": "Ron",
            "imageUrl": ""
        },
        {
            "id": "3",
            "text": "Professor Snape",
            "imageUrl": ""
        },
        {
            "id": "4",
            "text": "Malfoy",
            "imageUrl": ""
        },
    ],
    "required": [
        "answers"
    ]
}

const QuestionsWorkflow = new Map<string, TriviaQuestionDefinition>();

const harryPotterQuestions: TriviaQuestionDefinition = {
    questions: new Map<string, TriviaQuestionItem>()
}

harryPotterQuestions.questions.set("0", hpQuestion0);

const hpQuestion1 = {
    "id": "1",
    "title": "Harry Potter book",
    "questionText": "How does Harry first learn that he is a wizard",
    "type": "multiple",
    "next": "2",
    "answers": [
        {
            "id": "0",
            "text": "The Dursleys tell him when he is eight",
            "imageUrl": ""
        },
        {
            "id": "1",
            "text": "Dudley accidentally lets it slip",
            "imageUrl": ""
        },
        {
            "id": "2",
            "text": "He reads about it in the Daily Prophet",
            "imageUrl": ""
        },
        {
            "id": "3",
            "text": "Hagrid has to track him down to tell him",
            "imageUrl": ""
        }
    ],
    "required": [
        "answers"
    ]
}

harryPotterQuestions.questions.set("1", hpQuestion1);

const hpQuestion2 = {
    "id": "2",
    "title": "Harry Potter book",
    "questionText": "Who is Tom Riddle",
    "type": "single",
    "next": "display-results-step",
    "answers": [
        {
            "id": "0",
            "text": "Lord Volan De Mort",
            "imageUrl": ""
        },
        {
            "id": "1",
            "text": "Dudley",
            "imageUrl": ""
        },
        {
            "id": "2",
            "text": "Harry Potter",
            "imageUrl": ""
        },
        {
            "id": "3",
            "text": "Severus",
            "imageUrl": ""
        }
    ],
    "required": [
        "answers"
    ]
}

harryPotterQuestions.questions.set("2", hpQuestion2);

QuestionsWorkflow.set("harry-potter", harryPotterQuestions);
QuestionsWorkflow.set("star-wars-death-star", harryPotterQuestions);

export {QuestionsWorkflow};