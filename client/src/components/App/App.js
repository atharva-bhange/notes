import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import HomePage from '../HomePage';
import reducers from '../../reducer';

function App() {
    const store = createStore(
        reducers,
        composeWithDevTools(applyMiddleware(thunk))
    );

    return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <Route exact path="/create"></Route>
                        <Route exact path="/update/:id"></Route>
                        <Route exact path="/delete/:id"></Route>
                        <Route exact path="/note/:id"></Route>
                    </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
