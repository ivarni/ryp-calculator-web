import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SettingsMenu from '../components/SettingsMenu';

import { calculatorPath, diaryPath } from '../routes';

import '../styles/styles.less';

class App extends Component {

    constructor() {
        super();
        this.state = { open: false };
        this.openCalculator = this.openCalculator.bind(this);
        this.openDiary = this.openDiary.bind(this);
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
    router: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    state: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { state };
}

export default connect(mapStateToProps, {

})(withRouter(App));
