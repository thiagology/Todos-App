import React, { useState, useContext } from 'react';
import {
  Row, Form, Col, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { GoPlus } from 'react-icons/go';
import axios from '../../utils/api';
import { TodoContext } from '../../pages/Todo/TodoContextProvider';

export default function TodoForm() {
  const [todos, setTodos] = useContext(TodoContext);
  const [todo, setTodo] = useState('');

  // eslint-disable-next-line consistent-return
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/todos', { name: todo, isDone: false });

      setTodos([
        ...todos,
        response.data,
      ]);

      setTodo('');
      toast.success('Task created with success!');
    } catch (error) {
      toast.info('Task was not created.');
    }
  };

  const onChange = ({ target: { value } }) => {
    setTodo(value);
  };

  return (
    <Form className="mb-3" onSubmit={handleSubmit}>
      <Row>
        <Col lg={9} xl={9}>
          <Form.Group>
            <Form.Control
              value={todo}
              onChange={onChange}
              placeholder="Insira sua atividade diária"
            />
          </Form.Group>
        </Col>
        <Col>
          <Button disabled={!todo.trim()} type="submit">
            {' '}
            Adicionar Todo
            {' '}
            <GoPlus />
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
