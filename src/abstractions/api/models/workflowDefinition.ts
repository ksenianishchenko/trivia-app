import WorkflowStep from "./workflowStep";

type WorkflowDefinition = {
    startAt: string;
    steps: Map<string, WorkflowStep>;
};

export default WorkflowDefinition;