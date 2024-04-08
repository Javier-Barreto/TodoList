import React, { useEffect, useState } from 'react'
import * as dbapp from '../../../db/db'
import { useNavigate } from 'react-router-dom'
import { getUserId, isUserLogged } from '../../javascript/userActions' 
import { Task } from '../../components/Task'
import { addTask, getUserTasks, syncWithCloud } from '../../javascript/firestore'
import { getLocalstorageUserId, getLocalstorageUserTasks } from '../../javascript/localstorage'
import { Navbar } from '../../components/Navbar'
import { EditTaskModal } from '../../components/EditTaskModal'

export const Dashboard = () => {
  const navigate = useNavigate()
  const [descripcion, setDescripcion] = useState("")
  const [tasks, setTasks] = useState([])
  const [taskDesc, setTaskDesc] = useState({ id: 0, descripcion: ""})
  const [syncLater, setSyncLater] = useState(false)

  const countCompletedTasks = () => {
    let count = 0
    
    if (tasks.length != 0) {
      tasks.forEach((data) => {
        data.completado ? count++ : null
      })
    }

    return count
  }

  const countNotCompletedTasks = () => {
    let count = 0
    
    if (tasks.length != 0) {
      tasks.forEach((data) => {
        data.completado ? null : count++
      })
    }

    return count
  }

  const validAddTask = () => {
    if (descripcion == "") {
      alert("Favor de ingresar la descripcion de la tarea")
    } else {
      setDescripcion("")
      addTask(descripcion, setSyncLater)
      getUserTasks(setTasks)
    }
  }
  
  useEffect(() => {
    if(navigator.onLine) {
      isUserLogged(navigate)
    }

    const localUid = getLocalstorageUserId()

    let tasks = getLocalstorageUserTasks(localUid)
    
    if (tasks.length == 0) {
      getUserTasks(setTasks)
    }

    setTasks(tasks)
  }, [])

  useEffect(() => {
    if(syncLater) {
      syncWithCloud()
      setSyncLater(false)
    }
  }, [syncLater])

  return (
    <>
      <Navbar isDashboard={true}/>
      <div>
        <div className="p-4">
          <form className="col-sm-4 col-md-6 mb-5" onSubmit={(e) => e.preventDefault()}>
            <p>Add Task:</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="My task is about this....." onChange={(e) => {
                  setDescripcion(e.target.value)
                }
              } value={descripcion} />
              <button className="btn btn-outline-secondary" type="submit" onClick={() => validAddTask()}>Agregar</button>
            </div>
          </form>

          <div className="row">
            <div className="col-6 p-2" id="tasks">
              <p>Tasks:</p>
              <div className="overflow-auto" style={{ height: 400 }}>
                {
                  countNotCompletedTasks() == 0 ? 
                    <p>Create a new task</p>
                  :
                  tasks.map((data) => {
                    const { id, completado, descripcion } = data
                    if (!completado) {
                      return <Task key={`user-${id}`} id={id} completado={completado}  descripcion={descripcion} setTaskDesc={setTaskDesc}/>
                    }
                  })
                }
              </div>
            </div>

            <div className="col-6 p-2" id="tasks">
              <p>Completed tasks:</p>
              <div className="overflow-auto" style={{ height: 400 }}>
                {
                  countCompletedTasks() == 0 ? 
                  <p>You haven't completed any task yet!</p>
                  :
                  tasks.map((data) => {
                    const { id, completado, descripcion } = data
                    if (completado) {
                      return <Task key={`user-${id}`} id={id} completado={completado} descripcion={descripcion} setTaskDesc={setTaskDesc}/>
                    }
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditTaskModal taskDesc={taskDesc}/>
      {/* <footer className="text-center p-4 bg-dark text-white sticky-bottom">
        © {new Date().getFullYear()} Copyright: TodoList
      </footer> */}
    </>
  )
}
