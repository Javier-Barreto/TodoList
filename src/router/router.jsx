import { createBrowserRouter } from 'react-router-dom'
import { App, Dashboard, ErrorPage, Login, Root } from '../views/index.js'
import { signInUser } from '../javascript/userActions/index.js';
import { loginLoader as isUserLogged } from '../javascript/loaders/loginLoader.jsx';
import { dashboardLoader as sendToLogin } from '../javascript/loaders/dashboardLoader.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/TodoList/",
        element: <App />
      }
    ]
  },
  {
    path: "/TodoList/login",
    loader: isUserLogged,
    element: <Login />
  },
  {
    path: "/TodoList/dashboard",
    loader: sendToLogin,
    element: <Dashboard />
  }
]);

export default router