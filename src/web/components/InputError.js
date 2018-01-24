import React, { Component } from 'react'
import classnames from 'classnames';

class InputError extends Component {


   constructor(props) {
        super(props);
        this.state = {
            message: 'Input is invalid'
        };

    }


        render() {
          var errorClass = classnames({
            'error_container':   true,
            'visible':           this.props.visible,
            'invisible':         !this.props.visible
          });

          return (
            <div className={errorClass}>
              <span>{this.props.errorMessage}</span>
            </div>
          )
        }

}

export default InputError;
