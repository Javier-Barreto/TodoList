/*
Localstorage
*/

const getLocalstorageUserTasks = (uid) => {
  return JSON.parse(localStorage.getItem(uid))
}

const removeLocalstorageUser = (uid) => {
  localStorage.removeItem(uid)
}

const setLocalstorageUserTasks = (uid, tasks) => {
  localStorage.setItem(uid, tasks)
}

export { getLocalstorageUserTasks, removeLocalstorageUser, setLocalstorageUserTasks }