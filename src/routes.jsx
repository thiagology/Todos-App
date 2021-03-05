import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Todo from './pages/Todo';

const routes = [{
  component: Home,
  name: 'Home',
  path: '/',
}, {
  component: Todo,
  name: 'To Do',
  path: '/todo',
}];

const Routes = () => (
  <BrowserRouter>
    <Navbar title="How you Todoin'?" routes={routes} />
    <Switch>
      {routes.map((route) => (
        <Route exact key={route.path} path={route.path} component={route.component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
