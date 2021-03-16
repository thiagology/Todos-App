import React, { createContext, useState, useEffect } from 'react';
import axios from '../../utils/api';

export const TodoContext = createContext();

export default function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]); // estado dos todos

  // recebe e atualiza as informações da pagina
  const fetchData = async () => {
    const response = await axios.get('/todos');
    setTodos(response.data);
  };

  // chama a função a cada atualização da pagina
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TodoContext.Provider value={[todos, setTodos, fetchData]}>
      {children}
    </TodoContext.Provider>
  );
}
