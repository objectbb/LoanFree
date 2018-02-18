import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import Icon from 'material-ui/Icon'

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit * 4,
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

class PopOverIt extends React.Component {
    state = {
        open: false,
        anchorEl: null,
        anchorOriginVertical: 'center',
        anchorOriginHorizontal: 'center',
        transformOriginVertical: 'bottom',
        transformOriginHorizontal: 'bottom',
        positionTop: 200, // Just so the popover can be spotted more easily
        positionLeft: 50, // Same as above
        anchorReference: 'anchorPosition'
    };

    handleClickButton = () => {
        this.setState({
            open: true,
            anchorEl: findDOMNode(this.button),
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    button = null;

    render() {
        const { classes } = this.props;
        const {
            open,
            anchorEl,
            anchorOriginVertical,
            anchorOriginHorizontal,
            transformOriginVertical,
            transformOriginHorizontal,
            positionTop,
            positionLeft,
            anchorReference,
        } = this.state;

        return (
            <span>
              <Button
                mini
                ref={node => {
                this.button = node;
                }}
                variant="fab"
                disabled = {this.props.disabled}
                onClick={this.handleClickButton}
              >
                {this.props.icon}
              </Button>

              <Popover
                open={open}
                anchorEl={anchorEl}
                anchorReference={anchorReference}
                anchorPosition={{ top: positionTop, left: positionLeft }}
                onClose={this.handleClose}
                anchorOrigin={{
                vertical: anchorOriginVertical,
                horizontal: anchorOriginHorizontal,
                }}
                transformOrigin={{
                vertical: transformOriginVertical,
                horizontal: transformOriginHorizontal,
              }}
              >
                {this.props.children}
              </Popover>
          </span>
        );
    }
}

PopOverIt.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PopOverIt);