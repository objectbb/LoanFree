import React, { Component } from "react"
import { connect } from "react-redux"
import "./app.css"
import FontIcon from "material-ui/FontIcon"

import CircularProgress from "material-ui/CircularProgress"
import Paper from "material-ui/Paper"
import { Card, CardHeader, CardText } from "material-ui/Card"
import AutoComplete from 'material-ui/AutoComplete';

class Events extends Component {
    constructor(props) {
        super(props)
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
    }

    componentDidMount() {
        console.log("Events ---> componentDidMount --> account", this.props.account)
        const { dispatch } = this.props
        this.props.dispatch({
            type: 'EVENTS_FETCH_REQUESTED',
            payload: { _accountId: this.props.account._id }
        })
    }

    handleUpdateInput(item) {
        console.log("Events --> handleUpdateInput ", item.value)
        this.props.dispatch({ type: 'EVENT_FETCH_SUCCEEDED', payload: item.value })
    };


    render() {

        const { events } = this.props

        console.log("Events --> render ", events)

        if (Object.getOwnPropertyNames(events.item).length === 0) return (<div/>)

        const menuitems = (events) ?
            events.item.map((item) => ({
                text: `${item.name} - ${item.address} ${item.city} ${item.state} `,
                value: item
            }))
            : []

        console.log(menuitems)

        return (
            <div>
                <AutoComplete
                    floatingLabelText="Choose Your Event (${events.length})"
                    filter={AutoComplete.fuzzyFilter}
                     openOnFocus={true}
                  dataSource={menuitems}
                  floatingLabelText={"Choose Your Event  [" + menuitems.length + "]"}
                  onNewRequest={this.handleUpdateInput}
                  fullWidth={true}
                />
      </div>
        )
    }
}

function mapStateToProps(state) {

    const { events, event } = state

    return {
        events: events,
        event
    }
}

export default connect(mapStateToProps)(Events)