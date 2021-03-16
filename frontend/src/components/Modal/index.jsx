import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ // componente que abre para editar todo's
  show, toggle, title, children, onSubmit,
}) => (
  <Modal show={show} onHide={toggle}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={toggle}>
        Fechar
      </Button>
      <Button variant="primary" onClick={onSubmit}>
        Salvar Alterações
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ModalComponent;
