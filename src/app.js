import './assets/scss/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppIndex from './components/AppIndex';
import Login from './components/Login';
import { AuthProvider } from './context/authContext';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import { AppProvider } from './context/appContext';

ReactDOM.render(
    <AuthProvider>
        <AppProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} name="Login" />
                    <Route path="/register" component={SignUp} name="Sign Up" />
                    <Route path="/reset-password" component={ResetPassword} name="Reset Password" />
                    <Route path="/" component={AppIndex} />
                </Switch>
            </BrowserRouter>
        </AppProvider>
    </AuthProvider>,
    document.getElementById('app')
);
