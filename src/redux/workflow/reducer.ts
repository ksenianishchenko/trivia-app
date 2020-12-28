import IApiService from "../../abstractions/api/service/apiService";
import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";
import { LocalApiService } from "../../modules/api/service/localApiService";
import { setWorkflowDefinition } from "./actions";
import { ActionTypes } from "./actionTypes";
import { WorkflowActions, WorkflowState } from "./types";

const initialState: WorkflowState = {
    routers: new Map<string, IWorkflowRouter>(),
    workflowDefinition: null,
    currentStepId: null
}

const apiService: IApiService = new LocalApiService();

const setCurrentWorkflow = (id: string) => {
    return (dispatch) => {
        dispatch(setWorkflowDefinition(apiService.getTriviaWorkflow(id)))
    }
}

const workflowReducer = (state: WorkflowState = initialState, action: WorkflowActions) => {
    switch(action.type) {
        case ActionTypes.SET_ROUTERS:
            return {
                ...state,
                routers: action.payload
            }
        case ActionTypes.SET_WORKFLOW_DEFINITION:
            return {
                ...state,
                workflowDefinition: action.payload
            }
        default:
            return state;
    }
};

export {workflowReducer, setCurrentWorkflow};