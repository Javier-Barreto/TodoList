import React from 'react'
import { Navbar } from './components/Navbar'
import * as dbApp from '../db/db'
import { isLogged } from './javascript/userActions'

export const App = () => {
  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center">
        <h1>Website content</h1>
        {/* <button type="button" className="btn btn-secondary" onClick={() => console.log(isLogged())}>Check login status</button> */}
      </div>
    </div>
  )
}
