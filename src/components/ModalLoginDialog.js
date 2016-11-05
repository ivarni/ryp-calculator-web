import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default function DialogExampleModal(props) {
    const actions = [
        <FlatButton
            label="Avbryt"
            primary
            onTouchTap={props.handleClose}
        />,
        <FlatButton
            label="Logg inn"
            primary
            onTouchTap={() => window.gapi.auth2.getAuthInstance().signIn()}
        />,
    ];

    return (
        <div>
            <Dialog
                title="Logg inn med Google"
                actions={actions}
                modal
                open
            >
                Du vil bli spurt om å godkjenne at applikasjonen
                får tilgang til din Google profil.
            </Dialog>
        </div>
    );
}

DialogExampleModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
