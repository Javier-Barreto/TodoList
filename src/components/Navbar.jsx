import React from 'react'
import { signOutUser } from '../javascript/userActions'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = ({isLogin = false, isDashboard = false}) => {
  const navigate = useNavigate()
  
  const signOut = () => {
    if (confirm("Do you want to loggout?")) {
      signOutUser(navigate)
    }
  }

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">TodoList</Link>
        {
          isLogin ? 
            <Link to="login" className="btn btn-secondary">Login</Link>
          :

          isDashboard ?
            <button className="btn btn-secondary" onClick={() => signOut()}>Sign out</button>
          :
           <></>
        }
      </div>
    </nav>
  )
}
