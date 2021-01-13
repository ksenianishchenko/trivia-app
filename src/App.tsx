import React, {FunctionComponent, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import {modules} from "./modules/modules";

import './global-styles.scss';
import IWorkflowRouter from './abstractions/workflow/workflowRouter';
import { onSetRouter } from './redux/workflow/fetch';
import TriviaQuestionWorkflowRouter from './services/triviaWorkflowRouter';

type moduleItem = {
    url: string,
    component: FunctionComponent,
    name: string
}

type DispatchProps = {
    onSetRouter: (router: IWorkflowRouter) => void
}

type Props = DispatchProps;


// set router
const triviaRouter = new TriviaQuestionWorkflowRouter();

const App = (props: Props) => {

    const [router, setRouter] = useState(triviaRouter);
    const {onSetRouter} = props;

    useEffect(() => {
        setRouter(triviaRouter);
        onSetRouter(router);
    }, [router, onSetRouter])

    return (
        <div className="app">
            <Router>
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
    onSetRouter: (router: IWorkflowRouter) => onSetRouter(router)
}

export default connect(null, mapDispatch)(App);
