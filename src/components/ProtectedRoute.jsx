import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(UserContext);

    // Si no hay token, redirige a la página de inicio de sesión
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si hay token, renderiza el contenido protegido
    return children;
};

export default ProtectedRoute;
