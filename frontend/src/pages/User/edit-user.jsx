import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from '../../utils/api';
import Page from '../../components/Page';

export default function EditUser({ history }) {
  // retorna um objeto de uma key com pares de parametros da URL
  const { id } = useParams();

  const isNewUser = id === 'new'; // verifica se o usuario não existe ainda

  // estado inicial do formulario
  const initialState = {
    email: '',
    name: '',
  };

  const [form, setForm] = useState(initialState); // estado do formulario

  // verifica se tem algo valido nos campos
  const isFormValid = form.email && form.name;

  // acha o user pelo id
  const fetchUser = async () => {
    const response = await axios.get(`/user/${id}`);
    setForm(response.data);
  };

  // se o user não é novo, procura pelo id com o fetch
  useEffect(() => {
    if (!isNewUser) {
      fetchUser();
    }
  }, []);

  // qualquer alteração nos campos, ele atribui o valor ao nome correspondente do campo
  const onChange = (event) => {
    const { target: { name, value } } = event;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // impede que a pagina mude (default do submit)

    if (isFormValid) {
      try {
        if (isNewUser) {
          await axios.post('/user', form);
          toast.info('User created success'); // se for novo, cria
        } else {
          await axios.put(`/user/${id}`, form);
          toast.info('User updated success'); // senão, atualiza
        }
        history.push('/user');
      } catch (e) {
        toast.error('An unexpected error happened'); // erro qualquer
      }
    } else {
      toast.error('Form invalid'); // informações inválidas
    }
  };

  return (
    <Page title={isNewUser ? 'New User' : 'Edit User'}>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={form.name}
            name="name"
            type="text"
            required
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Email
          </Form.Label>
          <Form.Control
            value={form.email}
            name="email"
            type="email"
            required
            onChange={onChange}
          />
        </Form.Group>
        <Button
          disabled={!isFormValid}
          type="submit"
        >
          Save
        </Button>
      </Form>
    </Page>
  );
}
