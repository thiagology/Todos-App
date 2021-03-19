import React, { useContext } from 'react';
import { GiBroom } from 'react-icons/gi';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import TodoForm from '../../components/Todo/TodoForm';
import TodoList from '../../components/Todo/TodoList';
import axios from '../../utils/api';
import TodoContextProvider, { TodoContext } from './TodoContextProvider';

function Todo() {
  const [todos, setTodos] = useContext(TodoContext);

  // Função para apagar todos os Todo's
  const deleteAll = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const todo of todos) {
      // eslint-disable-next-line no-await-in-loop
      await axios.delete(`/todos/${todo.id}`);
      toast.success(`Task ${todo.name} removed with success`);
    }

    setTodos([]);
  };

  // Função para apagar os Todo's concluidos
  const deleteChecked = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const todo of todos) {
      if (todo.isDone === true) {
        // eslint-disable-next-line no-await-in-loop
        await axios.delete(`/todos/${todo.id}`);
        toast.success(`Task ${todo.name} removed with success`);
      }
    }
  };

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
      <button 
      disabled={todos.length === 0}
      type="button"
      className="btn btn-info"
       onClick={deleteChecked}>
        {' '}
        Limpar concluidos
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

export default () => (
  <TodoContextProvider>
    <Todo />
  </TodoContextProvider>
);
