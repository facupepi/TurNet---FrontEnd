import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Card, Button,Table , Alert, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { API_BASE_URL, REQUEST_OPTIONS, REQUEST_OPTIONS_GET } from '../../config';
import robotImage from '../assets/img/robot.png';

const UserHome = () => {
    const { user, token } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(true);
    useEffect(() => {
        if (!token) {
            setIsTokenValid(false);
            setTimeout(() => navigate('/login'), 2000);
        } else {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `${token}`);

            const requestOptions = {
                ...REQUEST_OPTIONS,
                headers: myHeaders,
            };

            fetch(`${API_BASE_URL}/auth`, requestOptions)
                .then((response) => {
                    if (response.status === 200) {
                        setIsTokenValid(true);

                        const bookingsRequestOptions = {
                            ...REQUEST_OPTIONS_GET,
                            headers: myHeaders,
                        };

                        fetch(`${API_BASE_URL}/bookings/clients/${user.id}`, bookingsRequestOptions)
                            .then((response) => {
                                if (response.ok) {
                                    return response.json();
                                } else {
                                    throw new Error('Error al obtener los turnos');
                                }
                            })
                            .then((result) => {
                                setBookings(result.bookings);
                                console.log('Turnos:', result);
                            })
                            .catch((error) => {
                                console.error('Error al obtener los turnos:', error);
                            });
                    } else if (response.status === 401) {
                        setIsTokenValid(false);
                        setTimeout(() => navigate('/login'), 2000);
                        throw new Error('Token inválido');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [token, navigate]);

    const [activeSection, setActiveSection] = useState('mi-cuenta');

    const handleSelect = (section) => {
        setActiveSection(section);
    };

    return (
        <>
            {!isTokenValid ? (
                <Alert variant="danger" className="text-center">
                    Token inválido. Redirigiendo a la página de inicio de sesión...
                </Alert>
            ) : (
                <>
                    <div className="bg-light-blue text-white text-center py-5 mb-5">
                        <h1>Mi Cuenta</h1>
                    </div>

                    <div className="robot-container text-center mb-4">
                        <img src={robotImage} alt="Robot" className="robot-image" />
                        <div className="speech-bubble">¡Hola, {user?.first_name}!</div>
                    </div>
                    <Container>
                    <Row>
                        <Col md={3} className="bg-light sidebar">
                            <Nav className="flex-column p-3">
                                <Nav.Link
                                    href="#"
                                    className={activeSection === 'mi-cuenta' ? 'active-link' : ''}
                                    onClick={() => handleSelect('mi-cuenta')}
                                >
                                    Mi Cuenta
                                </Nav.Link>
                                <Nav.Link
                                    href="#"
                                    className={activeSection === 'turnos' ? 'active-link' : ''}
                                    onClick={() => handleSelect('turnos')}
                                >
                                    Turnos
                                </Nav.Link>
                            </Nav>
                        </Col>

                        <Col md={9} className="main-content">
                            {activeSection === 'mi-cuenta' && (
                                <div>
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <form className='p-3'>
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <label htmlFor="firstName">Nombre</label>
                                                        <input
                                                            type="text"
                                                            id="firstName"
                                                            className="form-control"
                                                            defaultValue={user.first_name}
                                                            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <label htmlFor="lastName">Apellido</label>
                                                        <input
                                                            type="text"
                                                            id="lastName"
                                                            className="form-control"
                                                            defaultValue={user.last_name}
                                                            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={6}>
                                                        <label htmlFor="email">Email</label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            className="form-control"
                                                            defaultValue={user.email}
                                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <label htmlFor="phone">Teléfono</label>
                                                        <input
                                                            type="text"
                                                            id="phone"
                                                            className="form-control"
                                                            defaultValue={user.phone}
                                                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                                        />
                                                    </Col>
                                                </Row>
                                            </form>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )}
                            {activeSection === 'turnos' && (
                                <div>
                                    <Row className="justify-content-center">
                                        <Col md={12}>
                                        <Card className="mb-4">
                                            <Card.Body>
                                                <h2 className="text-center">Mis Reservas</h2>
                                                {bookings.length > 0 ? (
                                                <div className="table-responsive">
                                                    <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                        <th>Fecha</th>
                                                        <th>Hora</th>
                                                        <th>Servicio</th>
                                                        <th>Precio</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {bookings.map((booking) => (
                                                        <tr key={booking.id}>
                                                            <td>{booking.date}</td>
                                                            <td>{booking.time}</td>
                                                            <td>{booking.service.name}</td>
                                                            <td>${booking.service.price}</td>
                                                        </tr>
                                                        ))}
                                                    </tbody>
                                                    </Table>
                                                </div>
                                                ) : (
                                                <p className="text-center">No tienes reservas.</p>
                                                )}
                                            </Card.Body>
                                        </Card>
                                        </Col>
                                    </Row>

                                </div>
                            )}
                        </Col>
                    </Row>
                    </Container>
                </>
            )}
        </>
    );
};

export default UserHome;
