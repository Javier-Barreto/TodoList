import React, { useEffect, useState } from 'react'
import * as dbapp from '../../../db/db'
import { useNavigate } from 'react-router-dom'
import { getUserId, isUserLogged } from '../../javascript/userActions' 
import { Task } from '../../components/Task'
import { addTask, getUserTasks } from '../../javascript/firestore'
import { getLocalstorageUserId, getLocalstorageUserTasks } from '../../javascript/localstorage'
import { Navbar } from '../../components/Navbar'

export const Dashboard = () => {
  const navigate = useNavigate()
  const [descripcion, setDescripcion] = useState("")
  const [tasks, setTasks] = useState([])
  const [syncLater, setSyncLater] = useState(false)

  const validAddTask = () => {
    if (descripcion == "") {
      alert("Favor de ingresar la descripcion de la tarea")
    } else {
      setDescripcion("")
      addTask(descripcion)
      setSyncLater(!syncLater)
      getUserTasks(setTasks)
    }
  }
  
  useEffect(() => {
    if(navigator.onLine) {
      isUserLogged(navigate)
    }

    if (navigator.onLine) {
      getUserTasks(setTasks)
    } else {
      const localUid = getLocalstorageUserId()
      if (localUid) {
        setTasks(getLocalstorageUserTasks(localUid))
      }
    }
  }, [])

  useEffect(() => {
    if(syncLater && navigator.onLine) {
      syncWithCloud()
      setSyncLater(!syncLater)
    }
  }, [syncLater])

  return (
    <>
      <Navbar isDashboard={true}/>

      <div>
        <div className="col g-0 p-4">
          <form className="col-sm-4 col-md-6" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="My task is about this....." onChange={(e) => {
                  setDescripcion(e.target.value)
                }
              } value={descripcion} />
              <button className="btn btn-outline-secondary" type="submit" onClick={() => validAddTask()}>Agregar</button>
            </div>
          </form>

          <div className="col-sm-4 col-md-6" id="tasks">
              {
                tasks == 0 ? 
                  <p>Create a new task</p>
                :
                tasks.map((data) => {
                  const { id, descripcion } = data
                  return <Task key={`user-${id}`} id={id} descripcion={descripcion} />
                })
              }
          </div>
        </div>
      </div>
    </>
  )
}
