import { useEffect, useState } from "react"
import { Navbar } from '../../components/Navbar'
import * as dbApp from '../../../db/db'
import { createUser, getUserId, signInUser } from "../../javascript/userActions/index"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [logging, setLogging] = useState(true)
  const [loginE, setLoginEmail] = useState("")
  const [loginP, setLoginPwd] = useState("")
  const [registerE, setRgsEmail] = useState("")
  const [registerP, setRgsPwd] = useState("")
  
  const clearFields = () => {
    setLoginEmail("")
    setLoginPwd("")
    setRgsEmail("")
    setRgsPwd("")
  }

  const loginValidation = async () => {
    if (loginE != '' && loginP != ''){
      signInUser(loginE, loginP, navigate)
    } else {
      alert("Please, fill out all the fields")
    }
  }

  const registerValidation = () => {
    if (registerE != '' && registerP != ''){
      createUser(registerE, registerP, navigate)
    } else {
      alert("Please, fill out all the fields")
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        {logging ? 
          <>
            <div className="text-center mt-3">
              <h5>Sign in</h5>
            </div>
            <div className="container pt-0">
              <form>
                <div className="form-group m-3">
                  <label htmlFor="loginEmail">Email</label>
                  <input type="text" className="form-control" id="loginEmail" placeholder="email@example.com" onChange={(e) => setLoginEmail(e.target.value)} 
                         value={loginE} required/>
                </div>
                <div className="form-group m-3">
                  <label htmlFor="loginPassword">Password</label>
                  <input type="password" className="form-control" id="loginPassword" placeholder="password" onChange={(e) => setLoginPwd(e.target.value)} 
                         value={loginP} required/>
                </div>
                <button type="button" className="btn btn-primary mx-3" onClick={() => {
                  loginValidation()
                }}>Sign In</button>
              </form>
            </div>
            <div className="text-center">
                <p>You don't have an account? <a className="card-link" onClick={() => { 
                  clearFields()
                  setLogging(!logging)
                }}>Register</a></p>
            </div>
          </>
          :
          <>
            <div className="text-center mt-3">
              <h5>Create account</h5>
            </div>
            <div className="container pt-0">
              <form>
                <div className="form-group m-3">
                  <label htmlFor="loginEmail">Email</label>
                  <input type="text" className="form-control" id="caEmail" placeholder="email@example.com" onChange={(e) => setRgsEmail(e.target.value)} 
                         value={registerE} required/>
                </div>
                <div className="form-group m-3">
                  <label htmlFor="loginPassword">Password</label>
                  <input type="password" className="form-control" id="caPassword" placeholder="password" onChange={(e) => setRgsPwd(e.target.value)} 
                         value={registerP} required/>
                </div>
                <button type="button" className="btn btn-primary mx-3" onClick={() => {
                  registerValidation()
                }}>Create Account</button>
              </form>
            </div>
            <div className="text-center">
                <p>You already have an accountt? <a className="card-link" onClick={() => {
                  clearFields()
                  setLogging(!logging)
                  }}>Sign in</a></p>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Login