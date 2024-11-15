import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../style.css';
import { API_BASE_URL, REQUEST_OPTIONS_GET } from "../utils/const";
import Loader from './Loader';
import { UserContext } from '../contexts/userContext';
import robotImage from '../assets/img/robot.png';

const Home = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useContext(UserContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`, REQUEST_OPTIONS_GET)
      .then((response) => response.json())
      .then((result) => {
        setServices(result.services);
        setIsLoading(false); // Indica que la carga ha terminado
      })
      .catch((error) => {
        console.error('Error al obtener los servicios:', error);
        setIsLoading(false); // Indica que la carga ha terminado incluso si hay un error
      });
  }, []);

  return (
    <>
      <div className='bg-breadcrumb'>
        <h1>TURNET</h1>
      </div>
      
      <Container className="mt-5 mb-5">
        {isLoading ? (
          <Loader />
        ) : (
          <Row className='d-flex align-items-center justify-content-center'>
            <Col md={8}>
              <h2 className='mb-5 text-center'>Conoce todos los servicios disponibles</h2>
              {services && services.length > 0 ? (
                services.map(({ service, workSchedules, workDays }) => (
                  <Card key={service.id} className='mb-4'>
                    <Card.Body>
                      <Card.Title className='color-primary text-uppercase'>{service.name}</Card.Title>
                      <Card.Text>
                        <strong>Duración:</strong> {service.duration} minutos<br />
                        <strong>Precio:</strong> ${service.price}<br />
                        <strong>Período de reserva:</strong> {service.reservation_period} días<br />
                        <strong>Días de trabajo:</strong> {workDays.map(day => day.name).join(', ')}<br />
                        <strong>Horarios de trabajo:</strong> {workSchedules.map(schedule => schedule.schedule.time).join(', ')}

                      </Card.Text>
                  
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p className="text-center">No hay servicios disponibles.</p>
              )}
            </Col>
          </Row>
        )}
        { user ?
          (
            <div className="robot-container text-center mb-4">
              <img src={robotImage} alt="Robot" className="robot-image" />
              <div className="speech-bubble">¡Hola, {user?.first_name || 'Usuario'}!</div>
            </div>
          )
          :
          (
            <div className="robot-container text-center mb-4">
              <img src={robotImage} alt="Robot" className="robot-image" />
              <div className="speech-bubble">Inicia sesión o <br></br>registrate para<br></br>acceder a tu cuenta!</div>
            </div>
          )
        }

      </Container>
    </>
  );
};

export default Home;