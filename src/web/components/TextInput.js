import React, { Component } from "react"
import { PropTypes } from "prop-types"
import TextField from "material-ui/TextField"
import InputError from "./InputError"

class TextInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: true,
            value: this.props.content,
            valid: false,
            errorMessage: "",
            errorVisible: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.validation = this.validation.bind(this)
    }

    handleChange(event) {
        //validate the field locally
        this.validation(event.target.value)

        //Call onChange method on the parent component for updating it's state
        //If saving this field for final form submission, it gets passed
        // up to the top component for sending to the server
        if (this.props.onChange) {
            this.props.onChange(event)
        }
    }

    handleBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur(event)
        }
    }

    validation(value, valid) {
        //The valid variable is optional, and true if not passed in:
        if (typeof valid === "undefined") {
            valid = true
        }

        var message = ""
        var errorVisible = false

        //we know how to validate text fields based on information passed through props
        if (!valid) {
            //This happens when the user leaves the field, but it is not valid
            //(we do final validation in the parent component, then pass the result
            //here for display)
            message = this.props.errorMessage
            valid = false
            errorVisible = true
        } else if (this.props.required && !value) {
            //this happens when we have a required field with no text entered
            //in this case, we want the "emptyMessage" error message
            message = this.props.emptyMessage
            valid = false
            errorVisible = true
        } else if (value.length < this.props.minCharacters) {
            //This happens when the text entered is not the required length,
            //in which case we show the regular error message
            message = this.props.errorMessage
            valid = false
            errorVisible = true
        }

        let { validate } = this.props

        let result
        if (validate) result = validate(value)
        //This happens when the text entered is not the required length,
        //in which case we show the regular error message
        if (result) {
            message = result
            valid = false
            errorVisible = true
        }

        this.setState({
            value: value,
            isEmpty: !value,
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
        })
    }

    render() {
        return (
            <div className={this.props.uniqueName}>

{/*}
          <input
            name= {this.props.uniqueName}
            placeholder={this.props.text}
            className={'form-input input input-' + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.content} />

          <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage} />

          hintText={this.props.text}
          floatingLabelText={this.props.floatingLabelText}
          floatingLabelFixed={true}
          errorText={this.state.errorMessage}
          multiLine={this.props.multiLine}

          */}


        <TextField
          name={this.props.uniquename}
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          label={this.props.text}
          placeholder={this.props.text}
          fullWidth={true}
          rows={this.props.rows}
        />
        <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage} />
      </div>
        )
    }
}

TextInput.propTypes = {
    uniquename: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
    minCharacters: PropTypes.number,
    validate: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    errorMessage: PropTypes.string,
    emptyMessage: PropTypes.string,
    multiLine: PropTypes.bool,
    rows: PropTypes.number,
    floatingLabelText: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default TextInput