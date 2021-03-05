import React, { useState, useEffect } from 'react';
import { GiBroom } from 'react-icons/gi';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';
import axios from '../../utils/api';

export default function index() {
  const [todos, setTodos] = useState([]); // estados dos Todos

  const fetchData = async () => {
    const response = await axios.get('/todos');
    setTodos(response.data);
  };

  const deleteAll = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const todo of todos) {
      // eslint-disable-next-line no-await-in-loop
      await axios.delete(`/todos/${todo.id}`);
      toast.success(`Task ${todo.name} removed with success`);
    }

    setTodos([]);
  };

  const deleteChecked = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const todo of todos) {
      if (todo.isDone === true) {
        // eslint-disable-next-line no-await-in-loop
        await axios.delete(`/todos/${todo.id}`);
        toast.success(`Task ${todo.name} removed with success`);
      }
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (

    <Page title="Todo App">

      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />

      <button
        disabled={todos.length === 0}
        type="button"
        className="btn btn-info"
        onClick={deleteAll}
      >
        Limpar todos os Todos
        {' '}
        <GiBroom />
      </button>
      {' '}
      <button type="button" className="btn btn-info" onClick={deleteChecked}>
        {' '}
        Limpar Completos
        {' '}
        <GiBroom />
        {' '}
      </button>
      <p>
        {`Contador: ${todos.length} atividades`}
      </p>
    </Page>
  );
}
