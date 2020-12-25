import { createStore, compose, applyMiddleware } from "redux";
import {combineReducers} from "redux";
import thunk from "redux-thunk";

import {triviaDataReducer} from "./modules/triviva/triviaList/reducer";
import { triviaQuestionReducer } from "./modules/triviva/triviaWorkflow/reducer";

const rootReducer = combineReducers({
    triviaData: triviaDataReducer,
    triviaWorkflow: triviaQuestionReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = [thunk];

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middlewares),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

export default store;