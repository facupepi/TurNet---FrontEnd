import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import '../style.css';
import turnetLogo from '../assets/img/turnet-white.png';
import { API_BASE_URL, REQUEST_OPTIONS } from '../utils/const';

const Header = () => {
    const { user, isAdmin, setUser, setIsTokenValid, setIsAdmin } = useContext(UserContext);
    const navigate = useNavigate();

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Hacer la solicitud al backend para eliminar la cookie
        fetch(`${API_BASE_URL}/logout`, REQUEST_OPTIONS)
        .then((response) => {
            if (response.ok) {
                // Borrar el contexto de usuario en el frontend
                setUser(null);
                setIsTokenValid(false);
                setIsAdmin(null);
                // Redirigir al login
                navigate('/login');
            } else console.error('Error al cerrar sesión');
        })
        .catch((error) => console.error('Error al cerrar sesión:', error));
    };
    
    if(user && (isAdmin === true)) {
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => navigate('/admin-home')}>
                    <img src={turnetLogo} className="logo" alt="Turnet Logo" />
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link onClick={() => navigate('/')}>Servicios</Nav.Link>
                        <Nav.Link onClick={() => navigate('/admin-home')}>Home</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
        )
    }
    else if(user && (isAdmin === false)) {
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => navigate('/user-home')}>
                    <img src={turnetLogo} className="logo" alt="Turnet Logo" />
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link onClick={() => navigate('/')}>Servicios</Nav.Link>
                        <Nav.Link onClick={() => navigate('/user-home')}>Mi cuenta</Nav.Link>
                        <Nav.Link onClick={() => navigate('/new-booking')}>Reservar</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
        )
    }
    else {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => navigate('/')}>
                    <img src={turnetLogo} className="logo" alt="Turnet Logo" />
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link onClick={() => navigate('/')}>Servicios</Nav.Link>
                        <Nav.Link onClick={() => navigate('/login')}>Iniciar Sesión</Nav.Link>
                        <Nav.Link onClick={() => navigate('/register')}>Registrarse</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
    }
};

export default Header;
