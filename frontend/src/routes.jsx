import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routelist';
import Navbar from './components/Navbar';

const Routes = () => (
  <BrowserRouter>
    <Navbar title="Pitang" routes={routes} />
    <Switch>
      {routes.map(({ path, component }) => ( // mapeia as rotas pelo path e component para a navbar
        <Route exact key={path} path={path} component={component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
