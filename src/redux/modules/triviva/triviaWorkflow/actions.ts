import TriviaQuestionItem from "../../../../abstractions/api/models/triviaQuestionItem";
import WorkflowDefinition from "../../../../abstractions/api/models/workflowDefinition";
import { ActionTypes } from "./action_types";

export const setTriviaCurrentQuestionShema = (question: TriviaQuestionItem) => ({
    type: ActionTypes.SET_CURRENT_QUESTION_SCHEMA,
    payload: question
});

export const setTriviaCurrentWorkflow = (workflow: WorkflowDefinition) => ({
    type: ActionTypes.SET_CURRENT_WORKFLOW,
    payload: workflow
});