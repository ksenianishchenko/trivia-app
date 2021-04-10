import { ActionTypes } from "./actionTypes";
import { DispatchTypeWorkflowRouters, WorkflowActions, WorkflowState } from "./types";

const initialState: WorkflowState = {
    routers: undefined,
    workflowDefinition: undefined,
    currentStepId: undefined,
    currentPath: undefined,
    totalQuestions: undefined
}

const workflowReducer = (state: WorkflowState = initialState, action: WorkflowActions) => {
    switch(action.type) {
        case ActionTypes.SET_ROUTER:
            return {
                ...state,
                routers: {...state.routers, ...action.payload}
            }
        case ActionTypes.SET_WORKFLOW_DEFINITION:
            return {
                ...state,
                workflowDefinition: action.payload
            }
        case ActionTypes.SET_CURRENT_STEP_ID:
            return {
                ...state,
                currentStepId: action.payload
            }
        case ActionTypes.SET_CURRENT_STEP:
            return {
                ...state,
                currentStep: action.payload
            }
        case ActionTypes.SET_CURRENT_PATH:
            return {
                ...state,
                currentPath: action.payload
            }
        case ActionTypes.SET_TOTAL_QUESTIONS:
            return {
                ...state,
                totalQuestions: action.payload
            }
        default:
            return state;
    }
};

export {workflowReducer};