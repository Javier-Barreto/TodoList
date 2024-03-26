import React, { useState } from 'react'
import { editTaskDescription } from '../javascript/firestore'

export const EditTaskModal = ({ taskDesc }) => {
  const { id, descripcion } = taskDesc
  const [newDesc, setNewDesc] = useState(descripcion)

  const validateEdit = () => {
    if(window.confirm("Quieres editar la tarea?")) {
      editTaskDescription(id, newDesc)
    }
  }

  return (
    <div className="modal fade" id="editTaskModal" tabIndex="-1" aria-labelledby="editTaskModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Task Description</h1>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <p>New description:</p>
              <textarea className="form-control" id="message-text" value={descripcion} onChange={(e) => {
                setNewDesc(e.target.value)
              }} />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-success mx-2" onClick={() => validateEdit()} data-bs-toggle="modal"
                      data-bs-target="#editTaskModal">Edit</button>
              <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#editTaskModal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
