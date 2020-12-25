import WorkflowStep from "./workflowStep";

interface IWorkflowRouter {
    route(step: WorkflowStep): void;
}

export default IWorkflowRouter;