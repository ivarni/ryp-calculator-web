/* global GOOGLE_API_KEY:false, GOOGLE_OAUTH_CLIENT_ID:false */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import scriptjs from 'scriptjs';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { hydrateStore } from 'ryp-calculator/lib/dispatchers';

import SettingsMenu from '../components/SettingsMenu';

import { calculatorPath, diaryPath } from '../routes';

import '../styles/styles.less';

const signInCallback = (signedIn) => {
    if (signedIn) {
        const authInstance = window.gapi.auth2.getAuthInstance();
        const user = authInstance.currentUser.get();
        const token = user.getAuthResponse().id_token;
        console.log(token);
    }
};

class App extends Component {

    constructor() {
        super();
        this.state = { open: false };
        this.openCalculator = this.openCalculator.bind(this);
        this.openDiary = this.openDiary.bind(this);
    }

    componentWillMount() {
        if (window.localStorage) {
            const storedData = window.localStorage.getItem('ryp');
            if (storedData) {
                this.props.hydrateStore(JSON.parse(storedData));
            }
        }
    }

    componentDidMount() {
        scriptjs('https://apis.google.com/js/client.js', () => {
            window.gapi.load('client', () => {
                window.gapi.client.init({
                    apiKey: GOOGLE_API_KEY,
                    clientId: GOOGLE_OAUTH_CLIENT_ID,
                    scope: 'email',
                })
                .then(() => window.gapi.auth2)
                .then((auth2) => {
                    auth2.getAuthInstance().isSignedIn.listen(signInCallback);
                    signInCallback(auth2.getAuthInstance().isSignedIn.get());
                });
            });
        });
    }
    openCalculator() {
        this.setState({
            open: false,
        });
        this.props.router.push(calculatorPath);
    }

    openDiary() {
        this.setState({
            open: false,
        });
        this.props.router.push(diaryPath);
    }

    render() {
        const { state } = this.props;

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Treningskalkulator"
                        iconElementRight={<SettingsMenu state={state} />}
                        onLeftIconButtonTouchTap={
                            () => this.setState({ open: true })
                        }
                    />
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={
                            open => this.setState({ open })
                        }
                    >
                        <MenuItem onTouchTap={this.openCalculator}>
                            Kalkulator
                        </MenuItem>
                        <MenuItem onTouchTap={this.openDiary}>
                            Dagbok
                        </MenuItem>
                    </Drawer>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    children: PropTypes.node,
    hydrateStore: PropTypes.func.isRequired,
    router: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    state: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { state };
}

export default connect(mapStateToProps, {
    hydrateStore,
})(withRouter(App));
