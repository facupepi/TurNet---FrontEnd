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

{
/*
El código utiliza el contexto UserContext para actualizar el estado global del usuario (setUser), el estado de validez del token (setIsTokenValid) y si el usuario es administrador (setIsAdmin).
Esto asegura que cualquier cambio en la autenticación se refleje en toda la aplicación.
Uso de fetch:

Realiza una solicitud a la API (${API_BASE_URL}/auth) para verificar si el usuario está autenticado.
La opción credentials: 'include' permite enviar cookies como las de sesión (httpOnly) junto con la solicitud.
Manejo de Respuestas:

Si la respuesta es satisfactoria (response.ok), convierte los datos de la respuesta en un objeto JSON.
Si no, lanza un error para manejar el flujo de rechazo.
Actualización del Estado:

Si la autenticación es exitosa:
Se guarda la información del usuario en el estado global (setUser).
Se comprueba el rol del usuario para determinar si es administrador (setIsAdmin).
Se marca el token como válido (setIsTokenValid).
En caso de error:
Los estados se resetean para reflejar que el usuario no está autenticado.
Retorno de checkAuth:

La función checkAuth se devuelve desde el hook para que pueda ser llamada en otros componentes.
*/
}