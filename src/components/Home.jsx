import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../style.css';
import { API_BASE_URL, REQUEST_OPTIONS_GET } from "../utils/const";
import Loader from './Loader';
import { UserContext } from '../contexts/userContext';
import robotImage from '../assets/img/robot.png';
import banner from '../assets/img/banner.png';

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
      
      <Container className="mb-5">
        {isLoading ? (
          <Loader />
        ) : (
          <Row className='d-flex align-items-center justify-content-center'>
            <Col md={8}>
            <img src={banner} className='banner-img' alt="banner" />
              <h2 className='mt-5 mb-5 text-center'>Conoce todos los servicios disponibles</h2>
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

{
/*
services: Un arreglo que almacenará los servicios obtenidos de la API.
isLoading: Un estado booleano que indica si los datos aún están siendo cargados desde la API.
Uso de useEffect:

El useEffect se ejecuta cuando el componente se monta ([] como dependencia, lo que significa que solo se ejecutará una vez).
Realiza una solicitud GET a la API para obtener los servicios disponibles y actualiza el estado services con la respuesta. Al finalizar la carga, el estado isLoading se actualiza a false.
Si ocurre un error durante la solicitud, se captura y se maneja el error, asegurando que isLoading también se actualice a false.

Condicional de Carga (isLoading):Mientras isLoading es true, se muestra el componente Loader (presumiblemente un spinner o indicador de carga).

Una vez que isLoading es false, se renderiza una lista de servicios utilizando el componente Card de react-bootstrap. Cada servicio incluye detalles como nombre, duración, precio, días de trabajo y horarios.

Si el usuario está autenticado (esto se verifica mediante el contexto UserContext), se muestra un mensaje personalizado dentro de una burbuja de diálogo (speech-bubble), saludando al usuario.
Si no hay usuario autenticado, se muestra un mensaje invitando al usuario a iniciar sesión o registrarse.
*/

}