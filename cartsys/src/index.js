import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from './App';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducers from "./store/reducers";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const composeEnhancers = composeWithDevTools({
    __REDUX_DEVTOOLS_EXTENSION__: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});
const store = createStore(allReducers, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById("root")
);