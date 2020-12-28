import React, {FunctionComponent, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import store from "./redux/store";

import {modules} from "./modules/modules";

import './global-styles.scss';
import { setRouters } from './redux/workflow/actions';
import IWorkflowRouter from './abstractions/workflow/workflowRouter';
import TriviaQuestionWorkflowRouter from './modules/trivia/services/triviaQuestionWorkflowRouter';

type moduleItem = {
    url: string,
    component: FunctionComponent,
    name: string
}

type DispatchProps = {
    onSetRouters: (routers: Map<string, IWorkflowRouter>) => void
}

type Props = DispatchProps;


// set routers
const allRouters = new Map<string, IWorkflowRouter>();
const triviaRouter = new TriviaQuestionWorkflowRouter();
allRouters.set(triviaRouter.getType(), triviaRouter);

const App = (props: Props) => {

    const [routers, setRouters] = useState(new Map<string, IWorkflowRouter>());
    const {onSetRouters} = props;

    useEffect(() => {
        setRouters(allRouters);
        onSetRouters(routers);
    }, [routers])

    return (
        <div className="app">
            <Router>
                <Route exact path="/" component={modules["trivia"][0].component} />
                {
                    modules["trivia"].map((module: moduleItem) => {
                        return (
                            <Route exact path={module.url} component={module.component} key={module.name}/>
                        )
                    })
                }
            </Router>
        </div>
    );
}

const mapDispatch = {
    onSetRouters: (routers: Map<string, IWorkflowRouter>) => setRouters(routers)
}

export default connect(null, mapDispatch)(App);
