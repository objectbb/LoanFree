import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';


const styles = {
    list: {
        width: 250,
    },
    listFull: {
        width: 'auto',
    },
};

class SlideDrawer extends React.Component {
    constructor() {
        super();
        this.state = {
            bottom: false
        };
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
        <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>

        <Drawer
          anchor="bottom"
          open={this.props.IsOpen}
          onClose={this.toggleDrawer('bottom', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('bottom', false)}
            onKeyDown={this.toggleDrawer('bottom', false)}
          >
            {this.props.children}
          </div>
        </Drawer>

      </div>
        );
    }
}

SlideDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SlideDrawer);