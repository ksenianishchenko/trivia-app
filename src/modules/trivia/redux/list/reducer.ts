import {ActionTypes} from "./action_types";
import {ITriviaItemsList, ITriviaItemsListAction, DispatchType} from "./types";
import {setTriviaItemsList} from "./actions";

const initialState:ITriviaItemsList = {
    triviaQuestionsList: []
};

const triviaQuestionsList = [
    {
        "question": "In Shakespeare's play Julius Caesar, Caesar's last words were...",
        "answers": ["Iacta alea est!", "Et tu, Brute?", "Vidi, vini, vici", "Aegri somnia vana"],
        "correct": "Et tu, Brute?"
    },
    {
        "question": "A group of tigers are referred to as:",
        "answers": ["Ambush", "Chowder", "Pride", "Destruction"],
        "correct": "Ambush"
    },
    {
        "question": "What is the top speed an average cat can travel?",
        "answers": ["42 mph", "13 mph", "9 mph", "31 mph"],
        "correct": "31 mph"
    },
    {
        "question": "A cat can jump to _____ times its own height:",
        "answers": ["3", "5", "9", "7"],
        "correct": "5"
    }
];

const onSetQuestionsRequest = () => {
    return (dispatch: DispatchType) => {
        dispatch(setTriviaItemsList(triviaQuestionsList));
    }
}

const triviaDataReducer = (state: ITriviaItemsList = initialState, action: ITriviaItemsListAction) => {
    switch(action.type) {
        case ActionTypes.SET_TRIVIA_QUESTIONS:
            return {
                ...state,
                triviaQuestionsList: action.payload
            }
        default:
            return state;
    }
};

export {triviaDataReducer, onSetQuestionsRequest};