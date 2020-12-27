import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";
import { ActionTypes } from "./actionTypes";

export const setRouters = (routers: Map<string, IWorkflowRouter>) => ({
    type: ActionTypes.SET_ROUTERS,
    payload: routers
});