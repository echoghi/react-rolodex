import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [sideNav, setSideNav] = useState(true);
    const [newContactSuccess, setNewContactStatus] = useState(false);

    return (
        <AppContext.Provider value={{ sideNav, setSideNav, newContactSuccess, setNewContactStatus }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppState = () => useContext(AppContext);
