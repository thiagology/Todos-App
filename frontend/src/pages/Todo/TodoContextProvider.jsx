import React, { createContext, useState, useEffect } from 'react';
import axios from '../../utils/api';
import { toast } from 'react-toastify';

export const TodoContext = createContext();

export default function TodoContextProvider({ children }) {
  const [todos, setTodos] = useState([]); // estado dos todos

  // recebe e atualiza as informações da pagina
  const fetchData = async () => {
    try {
      const response = await axios.get('/todo');
      setTodos(response.data.data);
    } catch (error) {
      toast.error('Oops... something went wrong');
    }
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
