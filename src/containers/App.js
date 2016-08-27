import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import RypPage from '~/containers/RypPage';

import '~/styles/styles.less';

function App(props) {
    return (
        <MuiThemeProvider>
            <div>
                <RypPage />
            </div>
        </MuiThemeProvider>
    );
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, {

})(App);
