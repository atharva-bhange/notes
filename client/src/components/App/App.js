import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import history from '../../history';
import HomePage from '../HomePage';
import CreateForm from '../CreateForm';
import reducers from '../../reducer';

function App() {
    const store = createStore(
        reducers,
        composeWithDevTools(applyMiddleware(thunk))
    );

    return (
        <div>
            <Provider store={store}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route exact path="/create">
                            <CreateForm />
                        </Route>
                        <Route exact path="/update/:id"></Route>
                        <Route exact path="/delete/:id"></Route>
                        <Route exact path="/note/:id"></Route>
                    </Switch>
                </Router>
            </Provider>
        </div>
    );
}

export default App;
