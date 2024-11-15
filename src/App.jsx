import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import NewBooking from "./components/NewBooking";
import UserHome from "./components/UserHome";
import Login from "./components/Login";
import { UserProvider, UserContext } from "./contexts/userContext";
import useAuthChecker from './hooks/useAuthChecker';
import AdminHome from './components/AdminHome';

const AppContent = () => {
  const { user, isAdmin, isTokenValid } = useContext(UserContext);
  const location = useLocation();
  const checkAuth = useAuthChecker(); // Hook personalizado para verificar la autenticación

  useEffect(() => {
      checkAuth();
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
        {!isTokenValid && !user && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>)}

        {user && !isAdmin && (
          <>
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/new-booking" element={<NewBooking />} />
            <Route path="*" element={<Navigate to="/user-home" />} /> {/* Redirige a /user-home si la ruta no coincide */}
          </>
        )}

        {user && isAdmin && (
          <>
            <Route path="/admin-home" element={<AdminHome />} />
            {/* Agrega aquí más rutas específicas para el administrador */}
            <Route path="*" element={<Navigate to="/admin-home" />} /> {/* Redirige a /admin-home si la ruta no coincide */}
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;

{
  /*
  El código implementa React Router para el enrutamiento dinámico basado en roles y autenticación, gestionados mediante un contexto global (UserContext) y un hook personalizado (useAuthChecker). Este hook verifica el estado de autenticación del usuario al navegar, actualizando los datos del usuario, su rol y la validez del token en el contexto.

  Las rutas se renderizan condicionalmente según el estado del usuario:

    Usuarios no autenticados solo acceden a las páginas de inicio, login y registro.
    
    Usuarios normales acceden a rutas como /user-home.

    Administradores tienen acceso exclusivo a rutas como /admin-home.
  */
}