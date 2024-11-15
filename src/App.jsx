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