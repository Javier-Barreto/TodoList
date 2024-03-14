import React from 'react'
import * as dbapp from '../../../db/db'
import { signOutUser } from '../../javascript/userActions' 
import { Task } from '../../components/Task'

export const Dashboard = () => {

  const signOut = () => {
    signOutUser()
    window.location.replace("/TodoList/")
  }

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href='/TodoList/'>ToDo List</a>
          <button className="btn btn-secondary" onClick={() => { signOut() }}>Sign out</button>
        </div>
      </nav>
      
      <div className="col g-0 p-4">
        <form className="col-sm-4 col-md-6">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="My task is about this....." required/>
            <button className="btn btn-outline-secondary" type="submit">Agregar</button>
          </div>
        </form>

        <div className="col-sm-4 col-md-6" id="tasks">
          <Task />
        </div>
      </div>
    </div>
  )
}
