import { createBrowserRouter } from 'react-router-dom'
import { App, Dashboard, ErrorPage, Login, Root } from '../views/index.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/TodoList/",
        element: <App />
      },     
      {
        path: "/TodoList/login",
        element: <Login />
      },
      {
        path: "/TodoList/dashboard",
        element: <Dashboard />
      }
    ] 
  }
]);

export default router