import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <div className='bg-breadcrumb'>
          <h1>TURNET</h1>
      </div>
      <Container className="mt-5 mb-5">
        <Row className='d-flex align-items-center justify-content-center'>
        
          <Col md={8}>
          <h2 className='mt-5 mb-5'>Conoce todos los servicios disponibles</h2>
          <div className='card-service'>
            <img src="https://via.placeholder.com/200" alt="service" className='card-service-img' />
            <div className='card-service-body'>
              <h5 className='font-weight-bold'>Service 1</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non diam commodo felis blandit placerat. 
                Nullam lacinia placerat egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <Button variant="primary" href='/reservar'>Reservar</Button>
            </div>

          </div>
            
          </Col>
          
        </Row>
      </Container>
    </div>
  );
};

export default Home;