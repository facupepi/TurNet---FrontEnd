import React, { createContext, useState } from 'react';

/*
En este código, se crea un contexto llamado UserContext y un componente proveedor (UserProvider) que utiliza el contexto para compartir el estado del usuario (user) y la función para actualizarlo (setUser) con los componentes hijos.
*/

// Crea un nuevo contexto llamado UserContext
export const UserContext = createContext();

//createContext() devuelve un objeto de contexto que puede ser utilizado para compartir datos entre componentes sin necesidad de pasar props manualmente a través de cada nivel del árbol de componentes.

/*
El componente UserProvider es un componente funcional que acepta un prop 'children' y devuelve un componente UserContext.Provider que envuelve a los componentes hijos. El valor del contexto incluye el estado 'user' y la función 'setUser' para actualizarlo. Inicialmente, el estado 'user' es null.

Este componente recibe children como prop, que representa los componentes hijos que serán envueltos por el UserProvider.
*/

export const UserProvider = ({ children }) => {
    // Define un estado llamado 'user' con su función 'setUser' para actualizarlo
    // Inicialmente, 'user' es null
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    return (
        // Proporciona el contexto UserContext a los componentes hijos
        // El valor del contexto incluye el estado 'user', 'token' y las funciones 'setUser' y 'setToken'
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
            {children} {/* Renderiza los componentes hijos */}
        </UserContext.Provider>
    );
};