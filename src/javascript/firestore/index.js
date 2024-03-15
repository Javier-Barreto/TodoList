import { app } from '../../../db/db'
import { doc, getFirestore, arrayUnion, onSnapshot, setDoc, updateDoc, getDoc } from "firebase/firestore"
import { getUserId } from '../userActions';
import { setLocalstorageUserTasks } from '../localstorage';

const db = getFirestore(app)
/* 
=========
Functions
=========
*/
const addTask = async (desc) => {
  const uid = getUserId()
  const userTasksDocRef = doc(db, "userTasks", `user-${uid}`) // Referencia a la DB de las tasks del usuario
  
  const data = await getDoc(userTasksDocRef) // Obtiene la info del documento
  let tempData = data.data() // Saca la informacion de la query del doc
  const { tasks } = tempData // Desesctructura y saca las tasks del usuario
  
  const task = { id: tasks.length, descripcion: desc, completado: false } // Crea la task en base a la informacion
  tasks.push(task) // Agrega las tareas a las tasks
  
  //Actualiza el documento
  await updateDoc(userTasksDocRef, {
    tasks: tasks
  })

  setLocalstorageUserTasks(getUserId(), JSON.stringify(tasks))
}

const createUserTasksDB = async (uid) => {
  await setDoc(doc(db, "userTasks", `user-${uid}`), { // db - Colleccion - Nombre del documento
    tasks: []
  });
}

const deleteTask = async (id) => {
  let eId = 0
  const uid = getUserId()
  const userTasksDocRef = doc(db, "userTasks", `user-${uid}`) // Referencia a la DB de las tasks del usuario
  
  const data = await getDoc(userTasksDocRef) // Obtiene la info del documento
  let tempData = data.data() // Saca la informacion de la query del doc
  const { tasks } = tempData

  tasks.forEach((data, index) => {
    const dataId = data.id

    if (dataId == id) {
      eId = index
    }
  })

  tasks.splice(eId, 1)

  await updateDoc(userTasksDocRef, {
    tasks: tasks
  })
  setLocalstorageUserTasks(getUserId(), JSON.stringify(tasks))
}

const getUserTasks = (setTasks) => {
  const uid = getUserId()
  let tasks = {}

  const sub = onSnapshot(doc(db, "userTasks", `user-${uid}`), (doc) => {
    const data = doc?.data()
    tasks = data.tasks

    setTasks(tasks)
    setLocalstorageUserTasks(getUserId(), JSON.stringify(tasks))
  })
}

export { addTask, createUserTasksDB, deleteTask, getUserTasks }