import { createBrowserRouter, redirect } from 'react-router-dom'
import { App } from '../App.jsx';
import Login from '../components/Login.jsx';
import { Dashboard } from '../views/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>There's been an error on main path</p>, 
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "dashboard",
    element: <Dashboard />
  }
]);

export default router