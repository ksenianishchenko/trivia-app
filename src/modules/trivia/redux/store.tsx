import { createStore, compose, applyMiddleware } from "redux";
import {combineReducers} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import {triviaDataReducer} from "./list/reducer";

const rootReducer = combineReducers({
    triviaData: triviaDataReducer
});

const middlewares = [logger, thunk];

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middlewares)
    )
);

export default store;