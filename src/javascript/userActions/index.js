import { 
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut } from "firebase/auth";

import { createUserTasksDB } from "../firestore/index"
import { removeLocalstorageUserId, removeLocalstorageUserTasks, setLocalstorageUserId } from "../localstorage";

const auth = getAuth();

/*
  =====================FUNCTIONS ====================
*/
const createUser = ( email, password, navigate) =>{
  if(navigator.onLine) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((data) => {
      const { user: { uid }} = data
      createUserTasksDB(uid)
      setLocalstorageUserId(uid)
    })
    .then(() => {
      navigate('/dashboard')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      alert(`There's been an error: Error ${errorCode}, ${errorMessage}`)
    });
  } else {
    alert()
  }
}

const getUserId = () => {
  const reGetAuth = getAuth() 
  return reGetAuth.currentUser?.uid
}

const signInUser = (email, password,navigate) => {
  if (navigator.onLine) {
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setLocalstorageUserId(data.user.uid)
      })
      .then(() => {
          navigate('/dashboard')
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(`There's been an error: Error ${errorCode}, ${errorMessage}`)
      });
  } else {
    alert("No internet connection!, Try again later!")
  }
}

const signOutUser = (navigate) => {
  if(navigator.onLine) {
    signOut(auth).then(() => {
      removeLocalstorageUserId("userId")
      removeLocalstorageUserTasks(getUserId())
    })
    .then(() => {
      alert("Logged out")
      navigate('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(`There's been an error: Error ${errorCode}, ${errorMessage}`)
    })
  }
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