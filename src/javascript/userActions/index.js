import { 
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut } from "firebase/auth";

import { createUserTasksDB } from "../firestore/index"
const auth = getAuth();

/*
  =====================FUNCTIONS ====================
*/
const createUser = ( email, password) =>{
  createUserWithEmailAndPassword(auth, email, password)
  .then((data) => createUserTasksDB(data.user.uid))
  .then(() => signInUser(email, password))
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`Error ${errorCode}; ${errorMessage}`)
  });
}

const getUserId = () => {
  return auth.currentUser.uid
}

const isLogged = () => {
  return auth.currentUser ? true : false;
}

const signInUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .finally(() => window.location.replace("/dashboard"))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

}

const signOutUser = () => {
  signOut(auth).then(() => {
    alert("Logged out")
  }).catch((error) => {
    alert("There has been an error" + error)
  })
}




export { createUser, getUserId, isLogged, signInUser, signOutUser }