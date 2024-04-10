import React from 'react'
import { FaCircleCheck, FaPencil, FaArrowRotateLeft, FaSliders, FaTrashCan } from 'react-icons/fa6'
import { completeTask, deleteTask } from '../javascript/firestore'

export const Task = ({ id, completado, descripcion, setSyncLater, setTasks, setTaskDesc}) => {
  const validateDelete = () => {
    if (window.confirm("Do you want to delete the task?")) {
      deleteTask(id, setSyncLater, setTasks)
    }
  }

  const data = {id: id, descripcion: descripcion}

  const taskDesc = () => {
    setTaskDesc(data)
  }
  
  return (
    <div className="mb-2 border rounded p-3 pe-0 bg-dark text-white row g-0">
      <div className="col-11 align-middle pt-1 border-start ps-3">
        <p>{descripcion}</p>
      </div>

      <div className="col-1">
        <div className="dropdown">
          <a className="hoverToPointer dropdown-toggle" data-bs-toggle="dropdown">
            <FaSliders />
          </a>

          <ul className="dropdown-menu">
            {
              completado ? 
                  <a className="dropdown-item hoverToPointer" onClick={() => completeTask(id, setSyncLater, setTasks)}> <FaArrowRotateLeft /> Undone</a>
                :
                  <>
                    <a className="dropdown-item hoverToPointer" onClick={() => completeTask(id, setSyncLater, setTasks)}> <FaCircleCheck /> Mark as done</a>
                    <a className="dropdown-item hoverToPointer" data-bs-toggle="modal" data-bs-target="#editTaskModal" onClick={() => taskDesc()}> <FaPencil /> Edit</a>
                  </>
            }
            <li> <a className="dropdown-item hoverToPointer" onClick={() => validateDelete()}> <FaTrashCan /> Delete</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
