import { Navbar, Nav, Container } from 'react-bootstrap';
import React from 'react';
import './style.css';
import turnetLogo from '../assets/img/turnet-white.png';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <img src={turnetLogo} className="logo" alt="Turnet Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto"> {/* Esta clase mueve los enlaces al final */}
                        <Nav.Link href="/">Servicios</Nav.Link>
                        <Nav.Link href="/login">Mi cuenta</Nav.Link>
                        <Nav.Link className='bg-blue' href="/#">Reservar</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
