import { React,useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import { API_BASE_URL, REQUEST_OPTIONS_GET } from '../utils/const';
import robotImage from '../assets/img/robot.png';
import Loader from './Loader';

const UserHome = () => {
    const { user, setUser } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    const [activeSection, setActiveSection] = useState('mi-cuenta');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Carga las reservas del usuario
            fetch(`${API_BASE_URL}/bookings/clients/${user.id}`, REQUEST_OPTIONS_GET)
            .then(response => {
                if (response.status === 200) {
                return response.json();
                } else if (response.status === 401) {
                setUser(null); // Elimina el usuario del contexto
                navigate('/login'); // Redirige si la autenticación ha fallado
                throw new Error('Token inválido');
                } else {
                throw new Error('Error al obtener los turnos');
                }
            })
            .then(result => {
                setBookings(result.bookings);
            })
            .catch(error => {
                console.error('Error al obtener los turnos:', error);
            })
            .finally(() => {
                setIsLoading(false); // Indica que la carga ha terminado
            });
    }, [user, navigate]);

    return (
        <>
            {isLoading ? (<Loader />) 
            : (
                <>
                    <div className="bg-breadcrumb mb-5">
                        <h1>Mi Cuenta</h1>
                    </div>

                    <div className="robot-container text-center mb-4">
                        <img src={robotImage} alt="Robot" className="robot-image" />
                        <div className="speech-bubble">¡Hola, {user?.first_name || 'Usuario'}!</div>
                    </div>

                    <Container className='mb-5 pb-5'>
                        <Row>
                            <Col md={3} className="bg-light sidebar">
                                <Nav className="flex-column p-3">
                                    <Nav.Link
                                        href="#"
                                        className={activeSection === 'mi-cuenta' ? 'active-link' : ''}
                                        onClick={() => setActiveSection('mi-cuenta')}
                                    >
                                        Mi Cuenta
                                    </Nav.Link>
                                    <Nav.Link
                                        href="#"
                                        className={activeSection === 'turnos' ? 'active-link' : ''}
                                        onClick={() => setActiveSection('turnos')}
                                    >
                                        Mis Turnos
                                    </Nav.Link>
                                </Nav>
                            </Col>

                            <Col md={9} className="main-content">
                                {activeSection === 'mi-cuenta' && (
                                    <div>
                                        <Card className="mb-4 h-100">
                                            <Card.Body>
                                                <form className='p-3'>
                                                    <Row className="mb-3">
                                                        <Col md={6}>
                                                            <label htmlFor="firstName">Nombre</label>
                                                            <input
                                                                disabled
                                                                type="text"
                                                                id="firstName"
                                                                className="form-control"
                                                                value={user?.first_name || ''}
                                                            />
                                                        </Col>
                                                        <Col md={6}>
                                                            <label htmlFor="lastName">Apellido</label>
                                                            <input
                                                                disabled
                                                                type="text"
                                                                id="lastName"
                                                                className="form-control"
                                                                value={user?.last_name || ''}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col md={6}>
                                                            <label htmlFor="email">Email</label>
                                                            <input
                                                                disabled
                                                                type="email"
                                                                id="email"
                                                                className="form-control"
                                                                value={user?.email || ''}
                                                            />
                                                        </Col>
                                                        <Col md={6}>
                                                            <label htmlFor="phone">Teléfono</label>
                                                            <input
                                                                disabled
                                                                type="text"
                                                                id="phone"
                                                                className="form-control"
                                                                value={user?.phone || ''}
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
                                                            <p className="text-center">No tienes reservas registradas al momento.</p>
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
