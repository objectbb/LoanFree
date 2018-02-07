import React, { Component } from 'react';
import { connect } from 'react-redux'
import Icon from 'material-ui/Icon'
import Button from "material-ui/Button"
import Badge from 'material-ui/Badge';
import { flash } from 'react-animations'
import { StyleSheet, css } from 'aphrodite';

import "./styles/app.css"

const styles = StyleSheet.create({
    bounce: {
        animationName: flash,
        animationDuration: '30s'
    }
})

class Error extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }

        this.openErrors = this.openErrors.bind(this)
    }

    openErrors() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { error } = this.props

        const errorList = error.history.
        filter((item) => item).
        map((item, idx) => <div className="error-list" key={idx}>{item.error} {item.timeStamp}</div>)

        return (<div className="error">
                {errorList.length > 0 &&
                <Badge badgeContent={errorList.length} color="primary">
                    <Icon onClick={this.openErrors}>error</Icon>
                    </Badge>
                }
                {this.state.isOpen && errorList}
        </div>);
    }
}

function mapStateToProps(state) {
    const { error } = state

    return {
        error
    }
}

export default connect(mapStateToProps)(Error)