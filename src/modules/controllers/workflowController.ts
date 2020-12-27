import IWorkflowRouter from "../../abstractions/workflow/workflowRouter";

export default class WorkflowController {
    _routers: Map<string, IWorkflowRouter>;

    constructor() {
        this._routers = new Map<string, IWorkflowRouter>();
    }

    addRouter(workflowRouter: IWorkflowRouter) {
        this._routers.set(workflowRouter.getType(), workflowRouter);
    }
}