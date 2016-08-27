import React from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { fullWhite } from 'material-ui/styles/colors';

const iconButton = (
    <IconButton>
        <MoreVertIcon color={fullWhite}/>
    </IconButton>
);

function SettingsMenu() {
    return (
        <IconMenu
            iconButtonElement={iconButton}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
        </IconMenu>
    );
}

export default SettingsMenu;
