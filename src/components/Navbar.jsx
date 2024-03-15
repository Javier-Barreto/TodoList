import React from 'react'
import { signOutUser } from '../javascript/userActions'
import { Link } from 'react-router-dom'

export const Navbar = ({isLogin = false, isDashboard = false}) => {
  const signOut = () => {
    signOutUser()
    window.location.replace("/TodoList/")
  }

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/TodoList/" className="navbar-brand">TodoList</Link>
        {
          isLogin ? 
            <Link to="/TodoList/Login" className="btn btn-secondary">Login</Link>
          :

          isDashboard ?
            <Link to="/TodoList/" className="btn btn-secondary" onClick={() => signOut()}>Sign out</Link>
          :
           <></>
        }
      </div>
    </nav>
  )
}
