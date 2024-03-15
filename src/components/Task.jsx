import React from 'react'
import { deleteTask } from '../javascript/firestore'

export const Task = ({ id, descripcion}) => {

  const validateDelete = () => {
    if (window.confirm("Quieres borrar la tarae?")) {
      deleteTask(id)
    }
  }
  
  return (
    <div className="input-group mb-2 border rounded">
      <div className="col-sm-8 col-md-11 align-middle">
        <p>{descripcion}</p>
      </div>
      <button className="col-sm-4 col-md-1 btn btn-danger" type="button" onClick={() => validateDelete()}>X</button>
    </div>
  )
}
