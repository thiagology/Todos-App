import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { toast } from 'react-toastify';
import Page from '../../components/Page';
import api from '../../utils/api';
import { tokenKey } from '../../utils/constants';

export default function SignIn({ history }) {
  const [isLogin, setIsLogin] = useState(true); // estado da pagina de login 

  // estado inicial do formulario de login
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  });

  // qualquer alteração nos campos, ele atribui o valor ao nome correspondente do campo
  const onChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isLogin) {
        const response = await api.post('/auth', form);
        localStorage.setItem(tokenKey, response.data.token); //salvando token no local Storage
        toast.info('Welcome, user');
        history.push('/home');
      } else { // submit do cadastro
        await api.post('/user', form);
        toast.info('User created with success');
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const title = isLogin ? 'Sign In' : 'Sign Up';

  return (
    <Page title={title}>
      <Form onSubmit={onSubmit}>

        {!isLogin && (
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" value={form.name} onChange={onChange} />
          </Form.Group>
        )}

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" value={form.email} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" value={form.password} onChange={onChange} />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">{title}</Button>
        </div>

        <div>
          <Button
            onClick={() => setIsLogin(!isLogin)}
            variant="outline-primary"
          >
            {isLogin ? 'Create Account' : 'Login'}
          </Button>
        </div>

        
      </Form>
    </Page>
  );
}
