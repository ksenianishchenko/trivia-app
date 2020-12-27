import WorkflowDefinition from "../../abstractions/workflow/workflowDefinition";
import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";

export type WorkflowState = {
    routers: Map<string, IWorkflowRouter>;
    workflowDefinition: WorkflowDefinition | null;
    currentStepId: string | null;
}