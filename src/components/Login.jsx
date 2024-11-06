import React, {useState, useContext} from 'react';
import {Form,Button,Container,Row,Col,Card,Alert} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../contexts/userContext';
import {API_BASE_URL, REQUEST_OPTIONS} from '../../config';
import robotImage from '../assets/img/robot.png';

const Login = () => {
    const [formErrors,setFormErrors] = useState({});
    const [successMessage,setSuccessMessage] = useState('');
    const {setUser, setToken} = useContext(UserContext);
    const navigate = useNavigate();

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

        const requestOptions = {
            ...REQUEST_OPTIONS,
            body: JSON.stringify(data)
        };

        fetch(`${API_BASE_URL}/login`, requestOptions)
        .then((response) => {
            if (response.ok) {
                const token = response.headers.get('authorization');
                console.log('Token:', token);
                setToken(token); // Guarda el token en el contexto
                return response.json();
            } else {
                return response
                    .json()
                    .then((json) => {
                        setFormErrors(json.errors || {});
                        throw new Error('Error al iniciar sesión');
                    });
            }
        }).then((result) => {
            setSuccessMessage(result.message);
            setFormErrors({});
            
            setUser(result.client); // Guardar la información del usuario en el contexto
            event.target.reset(); // Vaciar el formulario
            setTimeout(() => navigate('/user-home'), 1000);
        }).catch((error) => {
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
                <h1 className="text-center mb-3">Inicia sesión</h1>
                    <Card>
                        <Card.Body className='login'>
                            {successMessage && <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>{successMessage}</Alert>}
                            {Object
                                .keys(formErrors)
                                .length > 0 && (
                                <Alert variant="danger" dismissible onClose={() => setFormErrors({})}>
                                    {Object
                                        .values(formErrors)
                                        .map((error, index) => (
                                            <div key={index}>{error}</div>
                                        ))}
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Ingresa tu correo electrónico"/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Ingresa tu contraseña"/>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Iniciar Sesión
                                </Button>
                                <div className='mt-3 text-center'>
                                <p>¿No tienes una cuenta? <a href="/register" className="w-100 mt-3">Registrate</a> </p>   
                                </div>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="robot-container">
                <img src={robotImage} alt="Robot" className="robot-image" />
                <div className="speech-bubble">Inicia sesión para<br></br>acceder a tu cuenta!</div>
            </div>
        </Container>
    );
};

export default Login;