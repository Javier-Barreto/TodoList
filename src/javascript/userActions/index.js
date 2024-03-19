import { 
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut } from "firebase/auth";

import { createUserTasksDB } from "../firestore/index"
import { removeLocalstorageUser } from "../localstorage";

const auth = getAuth();

/*
  =====================FUNCTIONS ====================
*/
const createUser = ( email, password, navigate) =>{
  createUserWithEmailAndPassword(auth, email, password)
  .then((data) => createUserTasksDB(data.user.uid))
  .then(() => signInUser(email, password, navigate))
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(`There's been an error: Error ${errorCode}, ${errorMessage}`)
  });
}

const getUserId = () => {
  return auth.currentUser?.uid
}

const signInUser = (email, password,navigate) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => navigate('/TodoList/dashboard'))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(`There's been an error: Error ${errorCode}, ${errorMessage}`)
    });
}

const signOutUser = () => {
  removeLocalstorageUser(getUserId())
  signOut(auth).then(() => {
    alert("Logged out")
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(`There's been an error: Error ${errorCode}, ${errorMessage}`)
  })
}

export { createUser, getUserId, signInUser, signOutUser }