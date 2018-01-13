import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import injectTapEventPlugin from "react-tap-event-plugin"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme"


import store from "../reducers/combine"
import App from './App';

let rootElement = document.getElementById("root")

injectTapEventPlugin()

render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <App />
        </MuiThemeProvider>
    </Provider>,
    rootElement
)