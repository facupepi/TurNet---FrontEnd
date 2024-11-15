import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTokenValid, setIsTokenValid] = useState(false);
    //console.log({ isAdmin, user, isTokenValid });
    
    return (
        <UserContext.Provider value={{ user, setUser, isTokenValid, setIsTokenValid , isAdmin, setIsAdmin}}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
