    import { useState } from 'react';
    import React from 'react';
    import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
    import { API_BASE_URL, REQUEST_OPTIONS } from '../../config';
    import robotImage from '../assets/img/robot.png';

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

        const errors = validateForm(data);
        if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
        }

        const dataRequest = JSON.stringify(data);

        const requestOptions = {
        ...REQUEST_OPTIONS,
        body: dataRequest
        };

        fetch(`${API_BASE_URL}/clients`, requestOptions)
        .then((response) => {
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
        })
        .catch((error) => {
            console.error('Error al crear cliente:', error);
            setSuccessMessage('');
        });
    };

    const validateForm = (formData) => {
        let formErrors = {};

        if (!formData.first_name) {
        formErrors.first_name = 'El nombre es obligatorio.';
        } else if (!/^[a-zA-Z]+$/.test(formData.first_name)) {
        formErrors.first_name = 'El nombre solo puede contener caracteres alfabéticos.';
        } else if (formData.first_name.length < 2) {
        formErrors.first_name = 'El nombre debe tener al menos 2 caracteres.';
        } else if (formData.first_name.length > 50) {
        formErrors.first_name = 'El nombre no puede tener más de 50 caracteres.';
        }

        if (!formData.last_name) {
        formErrors.last_name = 'El apellido es obligatorio.';
        } else if (!/^[a-zA-Z]+$/.test(formData.last_name)) {
        formErrors.last_name = 'El apellido solo puede contener caracteres alfabéticos.';
        } else if (formData.last_name.length < 2) {
        formErrors.last_name = 'El apellido debe tener al menos 2 caracteres.';
        } else if (formData.last_name.length > 50) {
        formErrors.last_name = 'El apellido no puede tener más de 50 caracteres.';
        }

        if (!formData.phone) {
        formErrors.phone = 'El teléfono es obligatorio.';
        } else if (!/^\d+$/.test(formData.phone)) {
        formErrors.phone = 'El teléfono solo puede contener números.';
        } else if (formData.phone.length < 7) {
        formErrors.phone = 'El teléfono debe tener al menos 7 caracteres.';
        } else if (formData.phone.length > 15) {
        formErrors.phone = 'El teléfono no puede tener más de 15 caracteres.';
        }

        if (!formData.email) {
        formErrors.email = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        formErrors.email = 'El correo electrónico no es válido.';
        } else if (formData.email.length < 5) {
        formErrors.email = 'El correo electrónico debe tener al menos 5 caracteres.';
        } else if (formData.email.length > 50) {
        formErrors.email = 'El correo electrónico no puede tener más de 50 caracteres.';
        }

        if (!formData.password) {
        formErrors.password = 'La contraseña es obligatoria.';
        } else if (formData.password.length < 8) {
        formErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        } else if (formData.password.length > 50) {
        formErrors.password = 'La contraseña no puede tener más de 50 caracteres.';
        }

        return formErrors;
    };

    return (
        <Container className="mt-5 mb-5">
        <Row className="justify-content-md-center">
            <Col md={6}>
            <h1 className="text-center mb-3">Registrate</h1>
            <Card>
                <Card.Body className='login'>
                {successMessage !=='' ? (
                    <div className="text-center">
                    <Alert variant="success">{successMessage}</Alert>
                    <Button variant="primary" href="/login">Ir a Iniciar Sesión</Button>
                    </div>
                ) : (
                    <>
                    {successMessage && <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}
                    {Object.keys(formErrors).length > 0 && (
                        <Alert variant="danger" dismissible onClose={() => setFormErrors({})}>
                        {Object.entries(formErrors).map(([key, error], index) => (<div key={index}>{error}</div>))}
                        </Alert>
                    )}
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
                            <p>¿Tienes una cuenta? <a href="/login" className="w-100 mt-3">Inicia sesión</a> </p>   
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
            <div className="speech-bubble">Registrate para<br></br>acceder a tu cuenta!</div>
        </div>
        </Container>
    );
    }

    export default Register;