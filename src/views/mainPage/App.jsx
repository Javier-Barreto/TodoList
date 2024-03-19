import React from 'react'
import { Navbar } from '../../components/Navbar'
import { getUserId } from '../../javascript/userActions'

export const App = () => {
  return (
    <>
      <Navbar isLogin={true} />
      <div>
        <div className="d-flex justify-content-center">
          <h1>Website content</h1>
          {/* <button onClick={() => console.log(getUserId())}>Auth status</button> */}
        </div>
      </div>
    </>
  )
}
