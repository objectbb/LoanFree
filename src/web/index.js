import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import store from "../reducers/combine"
import App from './App';

let rootElement = document.getElementById("root")

render(
    <Provider store={store}>
          <App />
        </Provider>,
    rootElement
)