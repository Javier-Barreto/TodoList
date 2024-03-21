import { createHashRouter } from 'react-router-dom'
import { App, Dashboard, ErrorPage, Login, Root } from '../views/index.js'

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />
      },     
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ] 
  }
], { basename: '/'});

export default router