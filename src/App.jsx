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

const AppContent = () => {
  const { user } = useContext(UserContext);
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
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirige a / si la ruta no coincide */}
        {user ? (
          <>
            <Route path="/user-home" element={<UserHome />} />
            <Route path="/new-booking" element={<NewBooking />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
      <Footer /> {/* Agregar el Footer aquí */}
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