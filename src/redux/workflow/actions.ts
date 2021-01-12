import WorkflowDefinition from "../../abstractions/workflow/workflowDefinition";
import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";
import WorkflowStep from "../../abstractions/workflow/workflowStep";
import { ActionTypes } from "./actionTypes";

export const setRouter = (router: { [key: string]: IWorkflowRouter; }) => ({
    type: ActionTypes.SET_ROUTER,
    payload: router
});

export const setWorkflowDefinition = (definition: WorkflowDefinition) => ({
    type: ActionTypes.SET_WORKFLOW_DEFINITION,
    payload: definition
});

export const setCurrentStepId = (id: string) => ({
    type: ActionTypes.SET_CURRENT_STEP_ID,
    payload: id
});

export const setCurrentStep = (step: any) => ({
    type: ActionTypes.SET_CURRENT_STEP,
    payload: step
});

export const setCurrentPath = (path: string) => ({
    type: ActionTypes.SET_CURRENT_PATH,
    payload: path
});