import React from 'react';
import PropTypes from 'prop-types';

class PersistentDrawer extends React.Component {

    constructor() {
        super()
    }

    render() {

        return (
            <div>
                {this.props.header}

                {this.props.toolbar}

                {this.props.children}
            </div>
        );
    }
}

export default PersistentDrawer;