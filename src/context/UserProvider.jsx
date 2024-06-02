import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ skills: [] }); // Initialize user with an empty skills array
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
export const useAppContext = () => useContext(UserContext);
