import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";
import { ActionTypes } from "./actionTypes";
import { WorkflowActions, WorkflowState } from "./types";

const initialState: WorkflowState = {
    routers: new Map<string, IWorkflowRouter>(),
    workflowDefinition: null,
    currentStepId: null
}

const workflowReducer = (state: WorkflowState = initialState, action: WorkflowActions) => {
    switch(action.type) {
        case ActionTypes.SET_ROUTERS:
            return {
                ...state,
                routers: action.payload
            }
        default:
            return state;
    }
};

export {workflowReducer};