import React, { Component, PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { fullWhite } from 'material-ui/styles/colors';

import ModalLoginDialog from './ModalLoginDialog';

const iconButton = (
    <IconButton>
        <MoreVertIcon color={fullWhite} />
    </IconButton>
);

const saveData = (state) => {
    const { exercises, days } = state;
    window.localStorage.setItem('ryp', JSON.stringify({ exercises, days }));
};

class SettingsMenu extends Component {

    constructor() {
        super();

        this.showLoginDialog = this.showLoginDialog.bind(this);
        this.closeLoginDialog = this.closeLoginDialog.bind(this);

        this.state = {
            showLogin: false,
        };
    }

    closeLoginDialog() {
        this.setState({
            showLogin: false,
        });
    }

    showLoginDialog() {
        this.setState({
            showLogin: true,
        });
    }

    render() {
        const { showLogin } = this.state;

        return (
            <div>
                { showLogin &&
                    <ModalLoginDialog handleClose={this.closeLoginDialog} />
                }
                <IconMenu
                    iconButtonElement={iconButton}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <MenuItem
                        primaryText="Save data"
                        onTouchTap={() => saveData(this.props.state)}
                    />
                    <MenuItem
                        primaryText="Log in"
                        onTouchTap={this.showLoginDialog}
                    />
                </IconMenu>
            </div>
        );
    }
}

SettingsMenu.propTypes = {
    state: PropTypes.object.isRequired,
};

export default SettingsMenu;
