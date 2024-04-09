/*
Localstorage
*/

const getLocalstorageUserTasks = (uid) => {
  return JSON.parse(localStorage.getItem(uid))
}

const getLocalstorageUserId = () => {
  return localStorage.getItem("userId")
}

const removeLocalstorageUserTasks = (uid) => {
  localStorage.removeItem(uid)
}

const removeLocalstorageUserId = () => {
  localStorage.removeItem("userId")
}

const setLocalstorageUserTasks = (uid, tasks) => {
  localStorage.setItem(uid, tasks)
}

const setLocalstorageUserId = (uid) => {
  localStorage.setItem("userId", uid)
}


export { getLocalstorageUserTasks, getLocalstorageUserId,
         removeLocalstorageUserId, removeLocalstorageUserTasks,
         setLocalstorageUserTasks, setLocalstorageUserId }