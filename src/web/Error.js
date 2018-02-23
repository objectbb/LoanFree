import React, { Component } from 'react';
import { connect } from 'react-redux'
import Icon from 'material-ui/Icon'
import Button from "material-ui/Button"
import Badge from 'material-ui/Badge';
import { flash } from 'react-animations'
import { StyleSheet, css } from 'aphrodite';
import PopOverIt from './components/PopOverIt'

import "./styles/app.css"

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
        const { activity } = this.props

        if(! activity) return(<div />)

        const errorList = activity.history.
        filter((item) => item.failed).
        map((item, idx) => <div className="error-list-item" key={idx}>{item.failed.message} {item.timeStamp}</div>)

        return (
            <div>
                 <div className="error">
                    {errorList.length > 0 &&
                    <PopOverIt icon={
                        <Badge style={{ float: 'right' }}  badgeContent={errorList.length} color="primary">
                            <Icon style={{ fontSize: 40 }} >error</Icon>
                        </Badge>
                    }>
                        <div className="error-list error">
                            {errorList}
                         </div>
                    </PopOverIt>
                }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { activity } = state

    return {
        activity
    }
}

export default connect(mapStateToProps)(Error)