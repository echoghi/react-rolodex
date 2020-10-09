import React, { createContext, useContext, useState } from 'react';
import Firebase from '../firebase';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(Firebase.auth);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
