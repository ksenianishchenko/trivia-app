import React, {FunctionComponent, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import {modules} from "./modules/modules";

import './global-styles.scss';
import IWorkflowRouter from './abstractions/workflow/workflowRouter';
import { onSetRouter } from './redux/workflow/fetch';
import TriviaQuestionWorkflowRouter from './services/triviaWorkflowRouter';
import TriviaResultWorkflowRouter from './services/triviaResultWorkflowRouter';
import { RootState } from './redux/store';

type moduleItem = {
    url: string,
    component: FunctionComponent,
    name: string
}

type StateProps = {
    currentTriviaPoster: string;
}

type DispatchProps = {
    onSetRouter: (router: IWorkflowRouter) => void
}

type Props = DispatchProps & StateProps;

// set routers
const triviaQuestionRouter = new TriviaQuestionWorkflowRouter();
const triviaResultRouter = new TriviaResultWorkflowRouter();

const App = (props: Props) => {

    const {onSetRouter, currentTriviaPoster} = props;

    const [questionRouter, setQuestionRouter] = useState(triviaQuestionRouter);
    const [resultRouter, setResultRouter] = useState(triviaResultRouter);

    useEffect(() => {
        setQuestionRouter(triviaQuestionRouter);
        setQuestionRouter(resultRouter);
        onSetRouter(questionRouter);
        onSetRouter(resultRouter);
    })

    return (
        <div className="app" style={{backgroundImage: `url("../resourses/${currentTriviaPoster}")`}}>
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

const mapState = (state: RootState | any) => ({
    currentTriviaPoster: state.triviaWorkflow.currentTriviaPoster
})

const mapDispatch = {
    onSetRouter: (router: IWorkflowRouter) => onSetRouter(router)
}

export default connect(mapState, mapDispatch)(App);
