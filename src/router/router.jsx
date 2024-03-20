import { Route, Routes } from 'react-router-dom'
import { App, Dashboard, ErrorPage, Login, Root } from '../views/index.js'
import { loginLoader as isUserLogged } from '../javascript/loaders/loginLoader.jsx';
import { dashboardLoader as sendToLogin } from '../javascript/loaders/dashboardLoader.jsx';

import React from 'react'

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='login' element={<Login />} loader={isUserLogged} />
        <Route path='dashboard' element={<Dashboard />} loader={sendToLogin} />
      </Routes>
    </>
  )
}
