import WorkflowStep from "./workflowStep";

export default interface IWorkflowRouter {
    getType(): string;
    route(step: WorkflowStep): void;
}