import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Card, Table, Button, Form, Alert } from 'react-bootstrap';
import { UserContext } from '../contexts/userContext';
import { API_BASE_URL, REQUEST_OPTIONS_GET, REQUEST_OPTIONS } from '../utils/const';
import Loader from './Loader';
import robotImage from '../assets/img/robot.png';
import '../style.css';
import { validateServiceData } from '../utils/helpers'; // Importar la función de validación

const AdminHome = () => {
    const { user } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('mi-cuenta');
    const [newService, setNewService] = useState({
        name: '',
        duration: '',
        price: '',
        reservation_period: '',
        days: [],
        startTime: '',
        endTime: ''
    });
    const [alert, setAlert] = useState({ show: false, variant: '', message: '' });

    useEffect(() => {
        fetch(`${API_BASE_URL}/services`, REQUEST_OPTIONS_GET)
            .then((response) => response.json())
            .then((result) => {
                setServices(result.services || []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener los servicios:', error);
                setIsLoading(false);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setNewService((prevState) => {
            const days = checked
                ? [...prevState.days, name]
                : prevState.days.filter((day) => day !== name);
            return { ...prevState, days };
        });
    };

    const handleCreateService = (e) => {
        e.preventDefault();

        // Validación de datos
        const validation = validateServiceData(newService);

        if (!validation.isValid) {
            setAlert({ show: true, variant: 'danger', message: 'Errores en los datos:\n' + Object.values(validation.errors).join('\n') });
            return;
        }

        const serviceData = {
            ...newService,
            duration: Number(newService.duration),
            price: Number(newService.price),
            reservation_period: Number(newService.reservation_period)
        };

        // Si la validación pasa, se envían los datos al backend
        const requestOptions = {
            ...REQUEST_OPTIONS,
            body: JSON.stringify(serviceData),
            credentials: 'include'
        };

        fetch(`${API_BASE_URL}/services`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setServices([...services, result.service]);
                setNewService({
                    name: '',
                    duration: '',
                    price: '',
                    reservation_period: '',
                    days: [],
                    startTime: '',
                    endTime: ''
                });
                setAlert({ show: true, variant: 'success', message: 'Servicio creado exitosamente' });
            })
            .catch((error) => {
                console.error('Error al crear el servicio:', error);
                setAlert({ show: true, variant: 'danger', message: 'Error al crear el servicio' });
            });
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        if (section === 'reservas') {
            setIsLoading(true);
            fetch(`${API_BASE_URL}/bookings`, REQUEST_OPTIONS_GET)
                .then((response) => response.json())
                .then((result) => {
                    setBookings(result || []);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error al obtener las reservas:', error);
                    setIsLoading(false);
                });
        }
    };

    return (
        <>
            <div className="bg-breadcrumb mb-5">
                <h1>Admin Panel</h1>
            </div>

            <Container className="mt-5 mb-5">
                {isLoading ? (
                    <Loader />
                ) : (
                    <Row>
                        <Col md={3} className="bg-light sidebar">
                            <Nav className="flex-column p-3">
                                <Nav.Link
                                    href="#"
                                    className={activeSection === 'mi-cuenta' ? 'active-link' : ''}
                                    onClick={() => handleSectionChange('mi-cuenta')}
                                >
                                    Mi Cuenta
                                </Nav.Link>
                                <Nav.Link
                                    href="#"
                                    className={activeSection === 'reservas' ? 'active-link' : ''}
                                    onClick={() => handleSectionChange('reservas')}
                                >
                                    Reservas
                                </Nav.Link>
                                <Nav.Link
                                    href="#"
                                    className={activeSection === 'crear-servicio' ? 'active-link' : ''}
                                    onClick={() => handleSectionChange('crear-servicio')}
                                >
                                    Crear Servicio
                                </Nav.Link>
                            </Nav>
                        </Col>

                        <Col md={9} className="main-content">
                            {alert.show && (
                                <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                                    {alert.message.split('\n').map((msg, idx) => (
                                        <div key={idx}>{msg}</div>
                                    ))}
                                </Alert>
                            )}
                            {activeSection === 'mi-cuenta' && (
                                <Card className="mb-4 h-100">
                                    <Card.Body>
                                        <form className="p-3">
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
                            )}

                            {activeSection === 'reservas' && (
                                <Card className="mb-4">
                                    <Card.Body>
                                        <h2 className="text-center">Reservas</h2>
                                        {bookings.length > 0 ? (
                                            <div className="table-responsive">
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Fecha</th>
                                                            <th>Hora</th>
                                                            <th>Servicio</th>
                                                            <th>Precio</th>
                                                            <th>Cliente</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {bookings.map((booking) => (
                                                            <tr key={booking.id}>
                                                                <td>{booking.date}</td>
                                                                <td>{booking.time}</td>
                                                                <td>{booking.service.name}</td>
                                                                <td>${booking.service.price}</td>
                                                                <td>{booking.client.first_name} {booking.client.last_name}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        ) : (
                                            <p className="text-center">No hay reservas registradas.</p>
                                        )}
                                    </Card.Body>
                                </Card>
                            )}

                            {activeSection === 'crear-servicio' && (
                                <Card className="mb-4">
                                    <Card.Body>
                                        <h2 className="text-center">Crear Servicio</h2>
                                        <Form onSubmit={handleCreateService}>
                                            <Form.Group className="mb-3" controlId="formServiceName">
                                                <Form.Label>Nombre del Servicio</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={newService.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Ingresa el nombre del servicio"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formServiceDuration">
                                                <Form.Label>Duración (minutos)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="duration"
                                                    value={newService.duration}
                                                    onChange={handleInputChange}
                                                    placeholder="Ingresa la duración del servicio"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formServicePrice">
                                                <Form.Label>Precio ($)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="price"
                                                    value={newService.price}
                                                    onChange={handleInputChange}
                                                    placeholder="Ingresa el precio del servicio"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formServiceReservationPeriod">
                                                <Form.Label>Período de Reserva (días)</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="reservation_period"
                                                    value={newService.reservation_period}
                                                    onChange={handleInputChange}
                                                    placeholder="Ingresa el período de reserva"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formServiceWorkDays">
                                                <Form.Label>Días de Trabajo</Form.Label>
                                                <div>
                                                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
                                                        <Form.Check
                                                            key={index}
                                                            type="checkbox"
                                                            id={`day-${index}`} // id único
                                                            label={day}
                                                            name={day}
                                                            checked={newService.days.includes(day)}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                    ))}
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formServiceStartTime">
                                                <Form.Label>Hora de Inicio</Form.Label>
                                                <Form.Control
                                                    type="time"
                                                    name="startTime"
                                                    value={newService.startTime}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formServiceEndTime">
                                                <Form.Label>Hora de Fin</Form.Label>
                                                <Form.Control
                                                    type="time"
                                                    name="endTime"
                                                    value={newService.endTime}
                                                    onChange={handleInputChange}
                                                />
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className="w-100">
                                                Crear Servicio
                                            </Button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default AdminHome;