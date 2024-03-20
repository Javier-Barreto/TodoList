import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/styles.scss' // Import our custom CSS
import * as bootstrap from 'bootstrap' // Import all of Bootstrap's JS
import { HashRouter } from 'react-router-dom'
import { Router } from './router/Router.jsx'
import * as serviceworker from './serviceWorker.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter basename='/'>
    <Router />
  </HashRouter>
)
