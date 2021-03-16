import React from 'react';
import { Card } from 'react-bootstrap';

export default function index({ title, children }) { // componente cartão no meio da página
  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-center">{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
}
