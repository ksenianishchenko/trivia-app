import WorkflowDefinition from "../../abstractions/workflow/workflowDefinition";
import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";

export default class WorkflowController {
    private readonly _routers: Map<string, IWorkflowRouter>;
    private _workflowDefinition: WorkflowDefinition | undefined;
    private _currentStepId: string;

    constructor() {
        this._routers = new Map<string, IWorkflowRouter>();
        this._workflowDefinition = undefined;
        this._currentStepId = "";
    }

    addRouter(workflowRouter: IWorkflowRouter) {
        this._routers.set(workflowRouter.getType(), workflowRouter);
    }

    initialize(definition: WorkflowDefinition) {
        this._workflowDefinition = definition;
        this._currentStepId = definition.startAt;
    }

    routeToCurrent() {
        if (!this._workflowDefinition) {
            throw Error("No workflow definition was initialized");
        }

        const currentStep = this._workflowDefinition.steps.get(this._currentStepId);
        if (!currentStep) {
            return;
        }

        const router = this._routers.get(currentStep.type);
        if (router) {
            return router.route(currentStep);
        }
    }
}