import WorkflowStep from "./workflowStep";

type WorkflowDefinition = {
    startAt: string;
    poster: string;
    steps: Map<string, WorkflowStep>;
};

export default WorkflowDefinition;