import React from 'react'
import { signOutUser } from '../javascript/userActions'
import { Link, useNavigate } from 'react-router-dom'
import { getLocalstorageUserId } from '../javascript/localstorage'

export const Navbar = ({isLogin = false, isDashboard = false}) => {
  const navigate = useNavigate()
  
  const signOut = () => {
    if (confirm("Do you want to loggout?")) {
      signOutUser(navigate)
    }
  }

  return (
    <nav className="navbar bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white">TodoList</Link>
        {
          isLogin ? 
            getLocalstorageUserId() != null ?
              <Link to="dashboard" className="btn btn-light">Dashboard</Link>
              :
              <Link to="login" className="btn btn-light">Login</Link>
          :

          isDashboard ?
            <button className="btn btn-light" onClick={() => signOut()}>Sign out</button>
          :
           <></>
        }
      </div>
    </nav>
  )
}
