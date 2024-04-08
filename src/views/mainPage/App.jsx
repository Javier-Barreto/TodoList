import React from 'react'
import { Navbar } from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { getUserId, signOutUser } from '../../javascript/userActions'

export const App = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navbar isLogin={true} />
      <div>
        <div className="d-flex justify-content-center mt-2">
          <h1>Website content</h1>
        </div>
        <button className="btn btn-primary" onClick={() => signOutUser(navigate)}>Loggout btn</button>
      </div>
    </>
  )
}
