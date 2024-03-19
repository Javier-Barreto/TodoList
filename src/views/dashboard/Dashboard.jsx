import React, { useEffect, useState } from 'react'
import * as dbapp from '../../../db/db'
import { getUserId } from '../../javascript/userActions' 
import { Task } from '../../components/Task'
import { addTask, getUserTasks } from '../../javascript/firestore'
import { getLocalstorageUserTasks, setLocalstorageUserTasks } from '../../javascript/localstorage'
import { Navbar } from '../../components/Navbar'

export const Dashboard = () => {
  const [descripcion, setDescripcion] = useState("")
  const [tasks, setTasks] = useState([])

  const validAddTask = () => {
    if (descripcion == "") {
      alert("Favor de ingresar la descripcion de la tarea")
    } else {
      addTask(descripcion)
      getUserTasks(setTasks)
    }
  }
  
  useEffect(() => {
    if(getLocalstorageUserTasks(getUserId())){
      setTasks(getLocalstorageUserTasks(getUserId()))
    } else {
      getUserTasks(setTasks)
    }
  }, [])

  return (
    <>
      <Navbar isDashboard={true}/>

      <div>
        <div className="col g-0 p-4">
          <div className="col-sm-4 col-md-6">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="My task is about this....." onChange={(e) => {
                  setDescripcion(e.target.value)
                }
              }/>
              <button className="btn btn-outline-secondary" type="button" onClick={() => validAddTask()}>Agregar</button>
            </div>
          </div>

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
