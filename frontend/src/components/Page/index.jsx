import React from 'react';
import { Container } from 'react-bootstrap';

import Card from '../Card';

export default function index({ children, title }) {
  return (
    <Container className="mt-5">
      <Card title={title}>
        {children}
      </Card>
    </Container>
  );
}
