import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/lib/integration/react'
//import configureStore from './store/configureStore'

import injectTapEventPlugin from "react-tap-event-plugin"
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
//import getMuiTheme from "material-ui/styles/getMuiTheme"
//import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme"

import configureStore from "../reducers/combine"
import App from './App';

let { store, persistor } = configureStore()

let rootElement = document.getElementById("root")

injectTapEventPlugin()

const theme = createMuiTheme();

render(
    <Provider store={store}>

        <MuiThemeProvider theme={theme}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </MuiThemeProvider>
    </Provider>,
    rootElement
)