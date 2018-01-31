import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/lib/integration/react'
//import configureStore from './store/configureStore'

import injectTapEventPlugin from "react-tap-event-plugin"
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import configureStore from "../reducers/combine"
import App from './App';

let { store, persistor } = configureStore()

let rootElement = document.getElementById("root")

injectTapEventPlugin()


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#CFD8DC',
            main: '#607D8B',
            dark: '#455A64',
            contrastText: '#fff',
        },
        secondary: {
            light: '#757575',
            main: '#212121',
            dark: '#ba000d',
            contrastText: '#795548',
        },
    },
});

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