import IApiService from "../../abstractions/api/service/apiService";
import WorkflowDefinition from "../../abstractions/workflow/workflowDefinition";
import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";
import { LocalApiService } from "../../modules/api/service/localApiService";
import WorkflowController from "../../modules/controllers/workflowController";
import { setCurrentStepId, setWorkflowDefinition, setRouter, setCurrentStep } from "./actions";
import { ActionTypes } from "./actionTypes";
import { DispatchTypeWorkflowRouters, WorkflowActions, WorkflowState } from "./types";

const initialState: WorkflowState = {
    router: undefined,
    workflowDefinition: undefined,
    currentStepId: undefined
}

const apiService: IApiService = new LocalApiService();
const workflowController = new WorkflowController();
let definition: WorkflowDefinition;

const setCurrentRouter = (router: IWorkflowRouter) => {
    return (dispatch: DispatchTypeWorkflowRouters) => {

        workflowController.addRouter(router);
        console.log(router);
        dispatch(setRouter(router));
    }
}

const setCurrentWorkflow = (id: string) => {
    return (dispatch: DispatchTypeWorkflowRouters) => {

        definition = apiService.getTriviaWorkflow(id)
        workflowController.initialize(definition);
        dispatch(setWorkflowDefinition(definition));
        dispatch(setCurrentStepId(definition.startAt));

    }
}

const getCurrentStep = () => {
    return(dispatch: DispatchTypeWorkflowRouters) => {
        const step = workflowController.routeToCurrent();
        dispatch(setCurrentStep(step));
    }
}



const workflowReducer = (state: WorkflowState = initialState, action: WorkflowActions) => {
    switch(action.type) {
        case ActionTypes.SET_ROUTER:
            return {
                ...state,
                router: action.payload
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
        default:
            return state;
    }
};

export {workflowReducer, setCurrentWorkflow, setCurrentRouter, getCurrentStep};