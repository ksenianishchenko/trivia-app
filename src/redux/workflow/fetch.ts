import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";
import apiService from "../../services/apiService";
import { AppThunk } from "../store";
import { setCurrentStepId, setRouter, setWorkflowDefinition, setCurrentPath } from "./actions";

type RouterPayload = {
    [key: string]: IWorkflowRouter;
}

const onSetRouter = ( router: IWorkflowRouter ): AppThunk<void> => (dispatch, getState) => {
    let type = router.getType();
    let payload: RouterPayload = {};
    payload[type] = router;
    dispatch(setRouter(payload));
    console.log(payload);
}

const initializeWorkflow = ( id: string ): AppThunk<void> => (dispatch, getState) => {
    apiService.getTriviaWorkflow(id, dispatch);
}

const setCurrentPathToQuestion = (): AppThunk<void> => (dispatch, getState) => {
    const _workflowDefinition = getState().workflow.workflowDefinition;
    const _currentStepId = getState().workflow.currentStepId;
    const _routers = getState().workflow.routers;
    const _currentTrivivaId = getState().triviaWorkflow.currentTriviaId;
    
    if (!_workflowDefinition) {
        throw Error("No workflow definition was initialized");
    }

    const currentStepSchema = _workflowDefinition.steps[_currentStepId];

    if (!currentStepSchema) {
        return;
      }

    const router = _routers[currentStepSchema.type];
    if (router) {
        let path = router.route(currentStepSchema, _currentTrivivaId, _currentStepId);
        dispatch(setCurrentPath(path));
    }

}

const handleSubmitQuestion = (): AppThunk<void> => (dispatch, getState) => {
    const _workflowDefinition = getState().workflow.workflowDefinition;
    let _currentStepId = getState().workflow.currentStepId;

    const currentStepSchema = _workflowDefinition.steps[_currentStepId];
    if(currentStepSchema) {
        if(currentStepSchema.next) {
            _currentStepId = currentStepSchema.next;
            dispatch(setCurrentStepId(_currentStepId));
        }
    }
}



export {onSetRouter,
    initializeWorkflow,
    setCurrentPathToQuestion,
    handleSubmitQuestion};