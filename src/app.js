import 'babel-polyfill';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './containers/Root';

import configureStore from './store/configureStore';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let preloadedState = {};
if (window.localStorage) {
    const storedData = window.localStorage.getItem('ryp');
    if (storedData) {
        preloadedState = JSON.parse(storedData);
    }
}

const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);
