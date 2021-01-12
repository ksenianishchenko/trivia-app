import WorkflowDefinition from "../../abstractions/workflow/workflowDefinition";
import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";
import WorkflowStep from "../../abstractions/workflow/workflowStep";

export type WorkflowState = {
    routers: { [key: string]: IWorkflowRouter; } | undefined;
    workflowDefinition: WorkflowDefinition | undefined;
    currentStepId: string | undefined;
    currentPath: string | undefined;
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

type WorkflowCurrentPathAction = {
    type: string;
    payload: string
}

export type WorkflowActions = WorkflowRouterAction
    | WorkflowCurrentStepIdAction
    | WorkflowDefinitionAction
    | WorkflowCurrentStepAction
    | WorkflowCurrentPathAction;

export type DispatchTypeWorkflowRouters = (arg: WorkflowActions) => WorkflowActions;