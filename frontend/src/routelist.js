import Home from './pages/Home';
import User from './pages/User';
import EditUser from './pages/User/edit-user';
import Todo from './pages/Todo';
import Auth from './pages/Auth';


const routes = [
    {
      component: Home,
      name: 'Home',
      path: '/',
    },
    {
      component: User,
      name: 'User',
      path: '/user',
    },
    {
      component: EditUser,
      path: '/user/:id',
      visible: false,
    },
    {
      component: Todo,
      name: 'Todo',
      path: '/todo',
    },
    {
      component: Auth,
      path: '/auth',
      visible: false,
    },
  ];

  export default routes;