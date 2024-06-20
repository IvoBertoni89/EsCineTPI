import React, { createContext, useState } from 'react';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const handleLogin = (data) => {
        setUserData(data);
    };

    const handleLogout = () => {
        setUserData(null);
    };

    return (
        <AuthenticationContext.Provider value={{ userData, handleLogin, handleLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
