import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';
import {API_BASE_URL, REQUEST_OPTIONS, REQUEST_OPTIONS_GET} from '../../config';

const UserHome = () => {
    const { user, token } = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(true);

    useEffect(() => {
        // Verifica si el token está presente y es válido
        if (!token) {
            setIsTokenValid(false);
            setTimeout(() => navigate('/login'), 2000);
        } 
        
        else {
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
                        REQUEST_OPTIONS_GET,
                        headers: myHeaders,
                    }

                    fetch(`${API_BASE_URL}/bookings/clients/${user.id}`, bookingsRequestOptions)
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Error al obtener los turnos');
                        }
                    })
                    .then((result) => {
                        setBookings(result.bookings); // Guarda las reservas en el estado
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

    return (
        <Container className="mt-5">
        {!isTokenValid ? (
            <Alert variant="danger" className="text-center">
            Token inválido. Redirigiendo a la página de inicio de sesión...
            </Alert>
        ) : (
            <>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                        <h1 className="text-center">Bienvenido a Tu Panel de Usuario</h1>
                        <p className="text-center">Aquí puedes gestionar tus turnos y ver la disponibilidad de servicios.</p>
                        {user && (
                            <div className="text-center">
                            <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Teléfono:</strong> {user.phone}</p>
                            </div>
                        )}
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    <Card className="mb-4">
                        <Card.Body>
                        <h2 className="text-center">Mis Reservas</h2>
                        {bookings.length > 0 ? (
                            <ListGroup>
                            {bookings.map((booking) => (
                                <ListGroup.Item key={booking.id}>
                                <Row>
                                    <Col md={3}><strong>Fecha:</strong> {booking.date}</Col>
                                    <Col md={3}><strong>Hora:</strong> {booking.time}</Col>
                                    <Col md={3}><strong>Servicio:</strong> {booking.service.name}</Col>
                                    <Col md={3}><strong>Precio:</strong> ${booking.service.price}</Col>
                                </Row>
                                </ListGroup.Item>
                            ))}
                            </ListGroup>
                        ) : (
                            <p className="text-center">No tienes reservas.</p>
                        )}
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
        </>
        )}
        </Container>
    );
}

export default UserHome;