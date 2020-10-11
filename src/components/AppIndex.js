import React, { Suspense, useEffect, lazy } from 'react';
import { Route, withRouter, useHistory } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Contacts = lazy(() => import('./Contacts'));
const ContactsImport = () => <Contacts />;

import Firebase from '../firebase';
import ErrorBoundary from './ErrorBoundary';
import Nav from './Nav';
import Loading from './Loading';

function AppIndex() {
    const { auth } = useAuth();
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = Firebase.auth.onAuthStateChanged((user) => {
            if (!user || !user.uid) history.push('/login');
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="app__container">
            {auth && auth.uid ? (
                <>
                    <Nav />

                    <Suspense fallback={<Loading />}>
                        <ErrorBoundary>
                            <Route exact={true} path="/" render={ContactsImport} name="Overview" />
                        </ErrorBoundary>
                    </Suspense>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default withRouter(AppIndex);
