import { app } from '../../../db/db'
import { doc, getFirestore, onSnapshot, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { getUserId } from '../userActions';
import { getLocalstorageUserId, getLocalstorageUserTasks, setLocalstorageUserTasks } from '../localstorage';
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore(app)

/* 
=========
Functions
=========
*/
const addTask = async (desc) => {
  if (navigator.onLine) {
    const uid = getUserId()
    const userTasksDocRef = doc(db, "userTasks", `user-${uid}`) // Referencia a la DB de las tasks del usuario
    
    const tasks = getLocalstorageUserTasks(uid)
    const task = { id: uuidv4(), descripcion: desc, completado: false } // Crea la task en base a la informacion
    
    tasks.push(task) // Agrega las tareas a las tasks
    
    await updateDoc(userTasksDocRef, {
      tasks: tasks
    })
  } else {
    const uid = getLocalstorageUserId()
    const tasks = getLocalstorageUserTasks(uid)
    console.log(uid, tasks)
    const task = { id: uuidv4(), descripcion: desc, completado: false }
    tasks.push(task)
    setLocalstorageUserTasks(uid, JSON.stringify(tasks))
  }
}

const createUserTasksDB = async (uid) => {
  await setDoc(doc(db, "userTasks", `user-${uid}`), { // db - Colleccion - Nombre del documento
    tasks: []
  });
}

const deleteTask = async (id) => {
  if(navigator.onLine) {
    let tId = 0
    const uid = getLocalstorageUserId()
    const userTasksDocRef = doc(db, "userTasks", `user-${uid}`) // Referencia a la DB de las tasks del usuario
    
    const data = await getDoc(userTasksDocRef) // Obtiene la info del documento
    let tempData = data.data() // Saca la informacion de la query del doc
    const { tasks } = tempData
  
    tasks.forEach((data, index) => {
      const dataId = data.id
  
      if (dataId == id) {
        tId = index
      }
    })
  
    tasks.splice(tId, 1)
  
    await updateDoc(userTasksDocRef, {
      tasks: tasks
    })
    setLocalstorageUserTasks(uid, JSON.stringify(tasks))
  } else {
    let tId = 0
    const uid = getLocalstorageUserId()
    const { tasks } = getLocalstorageUserTasks(uid)
  
    tasks.forEach((data, index) => {
      const dataId = data.id
  
      if (dataId == id) {
        tId = index
      }
    })
  
    tasks.splice(tId, 1)
  
    setLocalstorageUserTasks(uid, JSON.stringify(tasks))
  }
}

const getUserTasks = (setTasks) => {
  if (navigator.onLine) {
    const uid = getLocalstorageUserId()
    let tasks = {}
  
    const sub = onSnapshot(doc(db, "userTasks", `user-${uid}`), (doc) => {
      const data = doc?.data()
      tasks = data.tasks
  
      setTasks(tasks)
      setLocalstorageUserTasks(getUserId(), JSON.stringify(tasks))
    })
  } else {
    const uid = getLocalstorageUserId()
    let tasks = getLocalstorageUserTasks(uid)
    setTasks(tasks)
  }
}

export { addTask, createUserTasksDB, deleteTask, getUserTasks }