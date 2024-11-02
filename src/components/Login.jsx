import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

const Login = () => {
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const queryParams = new URLSearchParams(data).toString();

    fetch(`http://localhost:8080/login?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage('Inicio de sesión correcto');
          setFormErrors({});
        } else {
          return response.json().then((json) => {
            setFormErrors(json.errors || {});
            throw new Error('Error al iniciar sesión');
          });
        }
      })
      .then((result) => console.log(result))
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
      });
  };

  const validateForm = (formData) => {
    let formErrors = {};

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
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h1 className="text-center">Login</h1>
              {successMessage && <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}
              {Object.keys(formErrors).length > 0 && (
                <Alert variant="danger" dismissible onClose={() => setFormErrors({})}>
                  {Object.values(formErrors).map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Ingresa tu correo electrónico" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Ingresa tu contraseña" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Iniciar Sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;