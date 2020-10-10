import React, { createContext, useContext, useState } from 'react';

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
    const [sideNav, setSideNav] = useState(true);

    return <AppContext.Provider value={{ sideNav, setSideNav }}>{children}</AppContext.Provider>;
};

export const useAppState = () => useContext(AppContext);
