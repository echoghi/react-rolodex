import React, { Suspense, useEffect, lazy } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Home = lazy(() => import('./Home'));
const HomeImport = () => <Home />;

import Firebase from '../firebase';
import ErrorBoundary from './ErrorBoundary';
import Nav from './Nav';

function AppIndex({ history }) {
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        Firebase.auth.onAuthStateChanged((user) => {
            if (user) {
                setAuth(user);
            } else {
                history.push('/login');
            }
        });
    }, [history, setAuth]);

    useEffect(() => {
        if (!auth) history.push('/login');
    }, [auth, history]);

    return (
        <div>
            <Nav />

            <Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary>
                    <Route exact={true} path="/" render={HomeImport} name="Overview" />
                </ErrorBoundary>
            </Suspense>
        </div>
    );
}

export default withRouter(AppIndex);
