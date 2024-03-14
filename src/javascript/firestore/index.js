import { app } from '../../../db/db'
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import { getUserId } from '../userActions';

const db = getFirestore(app)
const referencia = doc(db, "userTasks");

const createUserTasksDB = async (uid) => {
  await setDoc(doc(db, "userTasks", "user-" + uid), { // db - Colleccion - Nombre del documento
    tasks: {}
  });
}

const getUserTasks = async () => {
  const uid = getUserId()
  const referencia = doc(db, "userTasks", `user-${uid}`);
  const data = await getDoc(referencia);

  console.log(data)
}

export { createUserTasksDB }