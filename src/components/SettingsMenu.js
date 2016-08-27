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

const saveData = state => {
    const { exercises, days } = state;
    window.localStorage.setItem('ryp', JSON.stringify({ exercises, days }));
}

function SettingsMenu(props) {
    return (
        <IconMenu
            iconButtonElement={iconButton}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <MenuItem
                primaryText="Save data"
                onTouchTap={() => saveData(props.state)}
            />
        </IconMenu>
    );
}

export default SettingsMenu;
