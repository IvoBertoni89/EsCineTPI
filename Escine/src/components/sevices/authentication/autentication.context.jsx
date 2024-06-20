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

    // Verificamos que handleLogout esté definido antes de pasarlo al contexto
    if (!handleLogout) {
        throw new Error("handleLogout no está definido en AuthenticationContextProvider");
    }

    return (
        <AuthenticationContext.Provider value={{ userData, handleLogin, handleLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
