// components/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-center py-3">
      <Container>
        <p className="mb-0">Desarrollado por Facundo Pepino & Santiago Villalba - © {new Date().getFullYear()}</p>
      </Container>
    </footer>
  );
}

export default Footer;
