import WorkflowDefinition from "../../abstractions/workflow/workflowDefinition";
import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";
import { ActionTypes } from "./actionTypes";

export const setRouters = (routers: Map<string, IWorkflowRouter>) => ({
    type: ActionTypes.SET_ROUTERS,
    payload: routers
});

export const setWorkflowDefinition = (definition: WorkflowDefinition) => ({
    type: ActionTypes.SET_WORKFLOW_DEFINITION,
    payload: definition
});