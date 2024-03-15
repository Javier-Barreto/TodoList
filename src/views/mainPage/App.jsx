import React from 'react'
import { Navbar } from '../../components/Navbar'

export const App = () => {
  return (
    <>
      <Navbar isLogin={true} />
      <div>
        <div className="d-flex justify-content-center">
          <h1>Website content</h1>
        </div>
      </div>
    </>
  )
}
