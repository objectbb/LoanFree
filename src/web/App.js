import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'
import ContainerMap from "./ContainerMap.js"

class App extends Component {

    componentWillMount() {
        const { dispatch } = this.props
    }

    render() {
        return (
            <div>
              <ContainerMap />
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
}

export default connect(null)(App)