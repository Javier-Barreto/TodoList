import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import './scss/styles.scss' // Import our custom CSS
import * as bootstrap from 'bootstrap' // Import all of Bootstrap's JS
import { RouterProvider } from 'react-router-dom'
import router from './router/router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
