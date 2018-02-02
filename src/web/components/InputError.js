import React, { Component } from 'react'
import classnames from 'classnames';
import "../styles/app.css"

class InputError extends Component {


    constructor(props) {
        super(props);
        this.state = {
            message: 'Input is invalid'
        };

    }


    render() {
        var errorClass = classnames({
            'visible': this.props.visible,
            'invisible': !this.props.visible,
            'error-input': true
        });

        return (
            <div className={errorClass}>
              <span>{this.props.errorMessage}</span>
            </div>
        )
    }

}

export default InputError;