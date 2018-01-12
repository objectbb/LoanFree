import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import store from "./src/reducers/combine"
import App from './src/native/App';

class LoanFree extends Component {
    render() {
        return (
            <Provider store={store}>
          <App />
        </Provider>
        );
    }
}

AppRegistry.registerComponent('LoanFree', () => LoanFree);