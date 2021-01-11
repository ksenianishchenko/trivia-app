import React, {FunctionComponent, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import {modules} from "./modules/modules";

import './global-styles.scss';
import IWorkflowRouter from './abstractions/workflow/workflowRouter';
import TriviaQuestionWorkflowRouter from './modules/trivia/services/triviaQuestionWorkflowRouter';
import { setCurrentRouter } from './redux/workflow/reducer';

type moduleItem = {
    url: string,
    component: FunctionComponent,
    name: string
}

type DispatchProps = {
    onSetRouter: (routers: IWorkflowRouter) => void
}

type Props = DispatchProps;


// set router
const triviaRouter = new TriviaQuestionWorkflowRouter();

const App = (props: Props) => {

    const [routers, setRouters] = useState(triviaRouter);
    const {onSetRouter} = props;

    useEffect(() => {
        setRouters(triviaRouter);
        onSetRouter(routers);
    }, [routers, onSetRouter])

    return (
        <div className="app">
            <Router forceRefresh={true}>
                <Switch>
                    <Route exact path="/" component={modules["TriviaQuestion"][0].component} />
                    {
                        modules["TriviaQuestion"].map((module: moduleItem) => {
                            return (
                                <Route exact path={module.url} component={module.component} key={module.name}/>
                            )
                        })
                    }
                </Switch>
            </Router>
        </div>
    );
}

const mapDispatch = {
    onSetRouter: (routers: IWorkflowRouter) => setCurrentRouter(routers)
}

export default connect(null, mapDispatch)(App);
