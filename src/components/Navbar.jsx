import React from 'react'

export const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href='/TodoList/'>ToDo List</a>
        <a href="/TodoList/login" className="btn btn-secondary">Login</a>
      </div>
    </nav>
  )
}
