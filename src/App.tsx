import React, {FunctionComponent} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import {modules} from "./modules/modules";

import './global-styles.scss';

type moduleItem = {
    url: string,
    component: FunctionComponent,
    name: string
}


function App() {
    return (
        <div className="App">
            <Provider store={store}>
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
            </Provider>
        </div>
    );
}

export default App;
