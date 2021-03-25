import React, { useState, useContext } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from '../../utils/api';
import { TodoContext } from '../../pages/Todo/TodoContextProvider';

import Modal from '../Modal';

import './Todo.scss';

const TodoList = () => {
  const [todos, setTodos] = useContext(TodoContext);
  const [editTodo, setEditTodo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');

  const handleChecked = async (event, editTodos) => {
    const { checked: isDone } = event.target;

    const newTodos = todos.map((todo) => {
      if (todo._id === editTodos._id) {
        return {
          ...todo,
          isDone,
        };
      }

      return todo;
    });

    try {
      await axios.put(`todo/${editTodos._id}`, { ...editTodos, isDone });
      setTodos(newTodos);
    } catch (e) {
      console.log(e);
      toast.warning('Oops... Something went wrong.');
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setText(todo?.name);
    setShowModal(!showModal);
  };

  const handleRemove = async ({ _id }) => {
    const newTodos = todos.filter((todo) => todo.id !== _id);

    try {
      await axios.delete(`/todo/${_id}`);
      setTodos(newTodos);
      toast.success('Task removed with success!');
    } catch (e) {
      console.log(e);
      toast.warning('Oops... Something went wrong.');
    }
  };

  const onEditTodo = async () => {
    const name = text;
    const newTodos = todos.map((todo) => {
      if (todo._id === editTodo._id) {
        return {
          ...todo,
          name,
        };
      }

      return todo;
    });
    try {
      await axios.put(`/todo/${editTodo._id}`, { ...editTodo, name });
      setTodos(newTodos);
      handleEdit();
      toast.success('Task updated with success!');
    } catch (e) {
      console.error(e.message);
      toast.warning('Oops... Something went wrong.');
    }
  };

  return (
    <>
      <Table bordered hover className="todos">
        <thead>
          <tr>
            <th>#</th>
            <th width="60%">Atividades</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index} className="todo">
              <td>
                <input
                  checked={todo.isDone}
                  onChange={(event) => handleChecked(event, todo)}
                  type="checkbox"
                />
              </td>
              <td>
                <span className={todo.isDone ? 'done' : ''}>{todo.name}</span>
              </td>
              <td>
                <Button onClick={() => handleEdit(todo)}>
                  <FaPencilAlt />
                </Button>
                <Button
                  onClick={() => handleRemove(todo)}
                  className="ml-2"
                  variant="danger"
                >
                  <FaTrash />

                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        onSubmit={onEditTodo}
        show={showModal}
        toggle={() => handleEdit()}
        title={editTodo?.name}
      >
        <Form.Group>
          <Form.Label>Novo nome</Form.Label>
          <Form.Control
            value={text}
            onChange={({ target: { value } }) => setText(value)}
          />
        </Form.Group>
      </Modal>
    </>
  );
};

export default TodoList;
