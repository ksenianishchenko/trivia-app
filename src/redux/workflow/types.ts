import WorkflowDefinition from "../../abstractions/workflow/workflowDefinition";
import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";
import WorkflowStep from "../../abstractions/workflow/workflowStep";

export type WorkflowState = {
    router: IWorkflowRouter | undefined;
    workflowDefinition: WorkflowDefinition | undefined;
    currentStepId: string | undefined;
}

type WorkflowRouterAction = {
    type: string;
    payload: IWorkflowRouter
}

type WorkflowDefinitionAction = {
    type: string;
    payload: WorkflowDefinition
}

type WorkflowCurrentStepIdAction = {
    type: string;
    payload: string
}

type WorkflowCurrentStepAction = {
    type: string;
    payload: any
}

export type WorkflowActions = WorkflowRouterAction | WorkflowCurrentStepIdAction | WorkflowDefinitionAction | WorkflowCurrentStepAction;

export type DispatchTypeWorkflowRouters = (arg: WorkflowActions) => WorkflowActions;