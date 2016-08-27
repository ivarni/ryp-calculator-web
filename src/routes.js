import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import RypPage from './containers/RypPage';
import RypResult from './containers/RypResult';

export const calculatorPath = '/calculator';
export const diaryPath = '/diary';

export default (
    <Route path="/" component={App}>
        <Route path={calculatorPath} component={RypPage} />
        <Route path={diaryPath} component={RypResult} />
    </Route>
);

