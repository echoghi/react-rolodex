import './assets/scss/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppIndex from './components/AppIndex';
import Login from './components/Login';
import { AuthProvider } from './context/authContext';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import { AppProvider } from './context/appContext';
import Toast from './components/Toast';

ReactDOM.render(
    <AuthProvider>
        <ToastProvider autoDismiss={true} components={{ Toast: Toast }}>
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
        </ToastProvider>
    </AuthProvider>,
    document.getElementById('app')
);
