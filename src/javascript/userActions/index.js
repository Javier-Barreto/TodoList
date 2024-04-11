import { 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut } from "firebase/auth";

import { createUserTasksDB } from "../firestore/index"
import { getLocalstorageUserId, removeLocalstorageUserId, removeLocalstorageUserTasks, 
         setLocalstorageUserId, setLocalstorageUserTasks } from "../localstorage";

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
      setLocalstorageUserTasks(uid, JSON.stringify([]))
    })
    .then(() => {
      navigate('/dashboard')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      alert(`There's been an error: Error ${errorCode}, ${errorMessage}`)
    });
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
        setLocalstorageUserTasks(data.user.uid, JSON.stringify([]))
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

const credentialResponse = (response) => {
  // Build Firebase credential with the Google ID token.
  const idToken = response.credential;
  const googleProvider =  GoogleAuthProvider.credential(idToken);
  const auth = getAuth()

  // Sign in with credential from the Google user.
  signInWithCredential(auth, googleProvider)
    .then((data) => {
      const { user: { uid }} = data
      createUserTasksDB(uid)
      setLocalstorageUserId(uid)
      setLocalstorageUserTasks(uid, JSON.stringify([]))
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      
      alert(`There has been an error! ${errorCode}: ${errorMessage}`)
    }
  );
}


const signOutUser = (navigate) => {
  if(navigator.onLine) {
    signOut(auth).then(() => {
      removeLocalstorageUserTasks(getLocalstorageUserId())
      removeLocalstorageUserId("userId")
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

export { createUser, credentialResponse, getUserId, isUserLogged, signInUser, signOutUser }