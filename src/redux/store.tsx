import { createStore, compose, applyMiddleware } from "redux";
import {combineReducers} from "redux";
import thunk, { ThunkAction} from "redux-thunk";

import {triviaDataReducer} from "./modules/triviva/triviaList/reducer";
import { triviaActions } from "./modules/triviva/triviaList/types";
import { triviaWorkflowReducer } from "./modules/triviva/triviaWorkflow/reducer";
import { TriviaWorkflowActions } from "./modules/triviva/triviaWorkflow/types";
import { workflowReducer } from "./workflow/reducer";
import { WorkflowActions } from "./workflow/types";

const rootReducer = combineReducers({
    triviaData: triviaDataReducer,
    workflow: workflowReducer,
    triviaWorkflow: triviaWorkflowReducer,
});

type Actions = WorkflowActions
 | TriviaWorkflowActions 
 | triviaActions

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = [thunk];

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middlewares),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

export type AppThunk<Result> = ThunkAction<Result, RootState, undefined, Actions>

export default store;