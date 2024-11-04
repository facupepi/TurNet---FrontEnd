import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <div className='bg-breadcrumb'></div>
      <div className="bg-dark text-white text-center py-5">
        <Container>
          <h1>Bienvenido a Mi Aplicación</h1>
          <p>
            Una solución ágil y sencilla para la gestión de turnos, diseñada para empresas y emprendimientos.
          </p>
          <Button variant="primary" href="/register">Regístrate</Button>
        </Container>
      </div>
      <Container className="mt-5">
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Consulta de Disponibilidad</Card.Title>
                <Card.Text>
                  Consulta la disponibilidad del servicio y selecciona el horario que desees.
                </Card.Text>
                <Button variant="primary" href="/services">Ver Servicios</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Visualiza tus Turnos</Card.Title>
                <Card.Text>
                  Visualiza los turnos que has reservado y gestiona tus citas fácilmente.
                </Card.Text>
                <Button variant="primary" href="/bookings">Mis Turnos</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src="https://via.placeholder.com/150" />
              <Card.Body>
                <Card.Title>Acceso Administrador</Card.Title>
                <Card.Text>
                  Accede en tiempo real a los turnos reservados por los clientes.
                </Card.Text>
                <Button variant="primary" href="/admin">Administrar</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;