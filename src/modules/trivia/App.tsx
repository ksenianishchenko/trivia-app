import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from './pages/Home';

import './global-styles.scss';


function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <Route exact path="/" component={Home} />
                </Router>
            </Provider>
        </div>
    );
}

export default App;