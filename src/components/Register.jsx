import { useState } from 'react';
import React from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { API_BASE_URL, REQUEST_OPTIONS } from '../utils/const';
import robotImage from '../assets/img/robot.png';

import { validateFormRegister } from '../utils/helpers';
import { Link } from 'react-router-dom';

function Register() {
    const [successMessage, setSuccessMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const data = {
            first_name: formData.get('firstName'),
            last_name: formData.get('lastName'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        const errors = validateFormRegister(data);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const dataRequest = JSON.stringify(data);

        const requestOptions = {
            ...REQUEST_OPTIONS,
            body: dataRequest
        };

        fetch(`${API_BASE_URL}/clients`, requestOptions).then((response) => {
            if (response.ok) {
                setSuccessMessage('Registro Exitoso');
                setFormErrors({});
                event.target.reset(); // Vaciar el formulario
            } else {
                return response.json().then((json) => {
                    setFormErrors(json.errors);
                    throw new Error('Error al crear cliente');
                });
            }
        }).catch((error) => {
            console.error('Error al crear cliente:', error);
            setSuccessMessage('');
        });
    };

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="text-center mb-3">Registrate</h1>
                    <Card>
                        <Card.Body className='login'>
                            {successMessage !== ''
                                ? (
                                    <div className="text-center">
                                        <Alert variant="success">{successMessage}</Alert>
                                        <Link to="/login" className="w-100 mt-3">
                                            <Button variant="primary" >Inicia Sesión</Button>
                                        </Link>
                                        
                                    </div>
                                )
                                : (
                                    <>
                                        {successMessage && <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}
                                        {
                                            Object.keys(formErrors).length > 0 && (
                                                <Alert variant="danger" dismissible onClose={() => setFormErrors({})}>
                                                    {Object.entries(formErrors).map(([key, error], index) => (<div key={index}>{error}</div>))}
                                                </Alert>
                                            )
                                        }
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" name="firstName" placeholder="Ingresa tu nombre" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Label>Apellido</Form.Label>
                                                <Form.Control type="text" name="lastName" placeholder="Ingresa tu apellido" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                                <Form.Label>Teléfono</Form.Label>
                                                <Form.Control type="text" name="phone" placeholder="Ingresa tu teléfono" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" name="email" placeholder="Ingresa tu correo electrónico" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Contraseña</Form.Label>
                                                <Form.Control type="password" name="password" placeholder="Ingresa tu contraseña" />
                                            </Form.Group>

                                            <Button variant="primary" type="submit" className="w-100">Registrarse</Button>
                                            
                                            <div className='mt-3 text-center'>
                                                <p>¿Ya tienes una cuenta? <Link to="/login" className="w-100 mt-3">Inicia sesión</Link> </p>
                                            </div>
                                        </Form>
                                    </>
                                )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="robot-container">
                <img src={robotImage} alt="Robot" className="robot-image" />
                <div className="speech-bubble">Registrate para<br />acceder a tu cuenta!</div>
            </div>
        </Container>
    );
}

export default Register;