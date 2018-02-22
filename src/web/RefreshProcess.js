import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import moment from 'moment'
import * as actions from "../actions"
import isEqual from 'lodash'
import Typography from 'material-ui/Typography'
import Icon from 'material-ui/Icon'
import Button from "material-ui/Button"
import Badge from "material-ui/Badge"
import classnames from "classnames"
import "./styles/app.css"
import "./styles/animate.css"

class RefreshProcess extends Component {
    constructor(props) {
        super(props)

        this.refresh = this.refresh.bind(this)
    }

    refresh() {
        this.props.actions.refreshHardEvent(this.props.participant)
    }

    render() {

        const { participant } = this.props

        return (
            <div>
            { participant.item &&
              participant.item.account &&
                <Button
                    mini
                    onClick={this.refresh}
                    color="secondary"
                    aria-label="clear"
                    variant="fab">
                    <div className='action-button'>CLEAR</div>
                </Button>
            }
            </div>
        )
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
        dispatch,
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefreshProcess)