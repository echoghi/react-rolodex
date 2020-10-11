import React, { createContext, useContext, useEffect, useState } from 'react';

import Firebase from '../firebase';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(Firebase.auth);

    useEffect(() => {
        const unsubscribe = Firebase.auth.onAuthStateChanged((user) => {
            if (user && user.uid) {
                setAuth(user);
            } else {
                setAuth({});
            }
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
