import './assets/scss/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppIndex from './components/AppIndex';
import Login from './components/Login';
import { AuthProvider } from './context/authContext';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';

ReactDOM.render(
    <AuthProvider>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} name="Login" />
                <Route path="/register" component={SignUp} name="Sign Up" />
                <Route path="/reset-password" component={ResetPassword} name="Reset Password" />
                <Route path="/" component={AppIndex} />
            </Switch>
        </BrowserRouter>
    </AuthProvider>,
    document.getElementById('app')
);
