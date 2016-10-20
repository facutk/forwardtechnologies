import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './Layout';
import CrimesContainer from './CrimesContainer'
import CrimeReport from './CrimeReport'

const Root = ({ store }) => (
    <Provider store={ store }>
        <Router history={ hashHistory }>
            <Route path='/' component={ Layout }>
                <IndexRoute component={CrimesContainer} />
                <Route path='/reportar' component={CrimeReport} />
            </Route>
        </Router>
    </Provider>
);

export default Root;
