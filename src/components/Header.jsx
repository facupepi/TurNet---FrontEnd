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


{

/*
Estado del Componente:

Utiliza useContext para acceder al contexto UserContext, que contiene el estado de autenticación del usuario (user, isAdmin, isTokenValid, etc.).
Dependiendo de si el usuario está autenticado y si es un administrador (isAdmin), se renderizan diferentes enlaces de navegación.

Condicional de Navegación:

Si el usuario está autenticado como administrador (isAdmin === true), se muestran enlaces para acceder a Home, Servicios y cerrar sesión (Cerrar Sesión).
Si el usuario está autenticado pero no es administrador (isAdmin === false), se muestran enlaces para Mi cuenta, Servicios, Reservar y cerrar sesión.
Si el usuario no está autenticado, se muestran los enlaces para iniciar sesión (Iniciar Sesión) y registrarse (Registrarse).
Función handleLogout:

Cuando el usuario hace clic en "Cerrar Sesión", se hace una solicitud fetch al backend para eliminar la cookie de sesión.
Si la solicitud es exitosa, se actualiza el contexto de usuario (se elimina el usuario del estado y se invalidan los datos de autenticación).
Luego, se redirige al usuario a la página de login.
Uso de useNavigate:

Se utiliza useNavigate de react-router-dom para redirigir a diferentes rutas dependiendo de la acción que el usuario realice (por ejemplo, al hacer clic en el logo o en los enlaces de navegación).

*/
}