import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import isEqual from 'lodash'
import * as actions from "../actions"

class DataFeeder extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (this.props.children)
    }
}

function mapStateToProps(state) {

    const { participant } = state

    return {
        participant
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataFeeder)