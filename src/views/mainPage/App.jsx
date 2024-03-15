import React from 'react'
import * as dbApp from '../../../db/db'
import { signOutUser } from '../../javascript/userActions/index'
import { Navbar } from '../../components/Navbar'

export const App = () => {
  return (
    <>
      <Navbar isLogin={true} />
      <div>
        <div className="d-flex justify-content-center">
          <h1>Website content</h1>
          <button className="btn btn-secondary" onClick={() => { signOutUser() }}>Sign out</button>
        </div>
      </div>
    </>
  )
}
