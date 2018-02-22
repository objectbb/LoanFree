import React, { Component } from 'react'
import Typography from 'material-ui/Typography';
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
            <Typography variant="body1">
                <span className={errorClass}>{this.props.errorMessage}</span>
             </Typography>
        )
    }

}

export default InputError;