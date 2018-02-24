import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    state = {
        open: false
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open
        });
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.onHandleClose()
    };

    render() {
        const { classes, open } = this.props;
        return (
            <div>
              <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                transition={Transition}
              >
                  <Toolbar style={{backgroundColor: '#757575', minHeight: '7px'}}>
                    <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                      <div className='action-button'>CLOSE</div>
                    </IconButton>
                  </Toolbar>
                  {this.props.children}
              </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);