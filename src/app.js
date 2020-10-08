import './assets/scss/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppIndex from './components/AppIndex';

ReactDOM.render(
    <>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={AppIndex} />
            </Switch>
        </BrowserRouter>
    </>,
    document.getElementById('app')
);
