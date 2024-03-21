import { 
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
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
  .then(() => navigate('/dashboard'))
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(`There's been an error: Error ${errorCode}, ${errorMessage}`)
  });
}

const getUserId = () => {
  const reGetAuth = getAuth() 
  return reGetAuth.currentUser?.uid
}

const signInUser = (email, password,navigate) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => navigate('/dashboard'))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(`There's been an error: Error ${errorCode}, ${errorMessage}`)
    });
}

const signOutUser = (navigate) => {
  removeLocalstorageUser(getUserId())
  signOut(auth).then(() => {
    alert("Logged out")
    navigate('/')
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(`There's been an error: Error ${errorCode}, ${errorMessage}`)
  })
}

const isUserLogged = (navigate) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return navigate("/dashboard")
    } else {
      return navigate("/login")
    }
  });

}

export { createUser, getUserId, isUserLogged, signInUser, signOutUser }