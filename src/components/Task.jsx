import React from 'react'
import { completeTask, deleteTask } from '../javascript/firestore'

export const Task = ({ id, completado, descripcion, setTaskDesc}) => {
  const validateDelete = () => {
    if (window.confirm("Quieres borrar la tarea?")) {
      deleteTask(id)
    }
  }

  const data = {id: id, descripcion: descripcion}

  const test = () => {
    setTaskDesc(data)
  }
  
  return (
    <div className="mb-2 border rounded p-3 bg-dark text-white">
      <div className="col-12 align-middle">
        <p>{descripcion}</p>
      </div>
      <div className="col-12 d-flex justify-content-end">
        {
          completado ? 
            <button className="btn btn-outline-warning mx-2" type="button" onClick={() => completeTask(id)}>Undone</button>
            :
            <>
              <button className="btn btn-outline-success mx-2" type="button" onClick={() => completeTask(id)}>Done</button>
              <button className="btn btn-outline-warning mx-2" data-bs-toggle="modal" data-bs-target="#editTaskModal"
                      onClick={() => test()}>Edit</button>
            </>
        }
        <button className="btn btn-outline-danger" type="button" onClick={() => validateDelete()}>Delete</button>
      </div>
    </div>
  )
}
