import 'babel-polyfill';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import Root from './containers/Root';

import configureStore from './store/configureStore';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

if ('serviceWorker' in navigator) {
    runtime.register();
}

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);
