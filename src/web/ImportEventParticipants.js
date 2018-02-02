import React, { Component } from "react"
import { connect } from "react-redux"
import { PropTypes } from "prop-types"
import Button from "material-ui/Button"
import TextInput from "./components/TextInput"
import { CircularProgress } from "material-ui/Progress"
import { Card, CardHeader, CardText } from "material-ui/Card"
import AddIcon from 'material-ui-icons/Add';
import DeleteIcon from 'material-ui-icons/Delete';
import Tooltip from 'material-ui/Tooltip';
import Icon from 'material-ui/Icon'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import "./styles/app.css"


class ImportEventParticipants extends Component {
    constructor(props) {
        super(props)
        this.state = { participants: '' };
        this.isEnabled = this.isEnabled.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.clearState = this.clearState.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        this.isEnabled = this.isEnabled.bind(this)
    }

    isEnabled() {
        return this.state.participants.split("\n").length > 0
    }

    clearState() {
        this.setState({ participants: '' })
    }

    handleChange(e) {
        e.preventDefault()
        const target = e.target
        const value = target.type === "checkbox" ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        const { event } = this.props;

        const participant = {
            _eventId: event.item._id,
            _accountId: '',
            _teamdId: '',
            coords: event.item.coords,
            markers: []
        }

        const accounts = this.state.participants.split("\n")

        this.props.dispatch({
            type: 'EVENT_PARTICIPANTS_BATCH_UPSERT_REQUESTED',
            payload: { accounts, participant }
        })
    }


    validateEmail(value) {
        return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? "Invalid email address"
            : undefined
    }

    render() {

        const { error, isFetching } = this.props.event
        let isEnabled = this.isEnabled()

        return (
            <div className="card">
              <div className="coords"> Copy/Paste a list of comma delimited -- email, firstname, lastname </div>
               <textarea name="participants"
                  onChange={this.handleChange}
                  placeholder=""
                  className="participants-list"
                  value={this.state.participants}/>
                  <br />
                {this.state.participants.split("\n").length - 1}

                {error &&
                  <p style={{ color: "red" }}>
                    {error}
                  </p>}
                  <br />
              <Tooltip id="tooltip-icon" title="Save">
                  <Button  disabled={!isEnabled} onClick={item => this.handleSubmit(item)} fab color="primary" aria-label="add">
                      {isFetching && <CircularProgress size={25} />}  <Icon>save</Icon>
                    </Button>
                  </Tooltip>
                  <Tooltip id="tooltip-icon" title="Clear" style={{float:'right'}}>
                      <Button onClick={this.clearState}  fab color="secondary" aria-label="edit" >
                        <Icon>clear</Icon>
                      </Button>
                </Tooltip>
                  </div>
        )
    }
}

function mapStateToProps(state) {
    const { event } = state

    console.log("ImportEventParticipant --> mapStateToProps --> event ", event)

    return {
        event
    }
}

export default connect(mapStateToProps)(ImportEventParticipants)