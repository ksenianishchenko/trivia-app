import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Welcome from "./pages/Welcome/index";
import Question from "./pages/Question/index"

import './global-styles.scss';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <Route exact path="/" component={Welcome} />
                    <Route exact path="/questions" component={Question} />
                </Router>
            </Provider>
        </div>
    );
}

export default App;