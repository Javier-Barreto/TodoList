import { useEffect, useState } from "react"
import { Navbar } from '../../components/Navbar'
import * as dbApp from '../../../db/db'
import { createUser, credentialResponse, isUserLogged, signInUser } from "../../javascript/userActions/index"
import { useNavigate } from "react-router-dom"
import { LoginInput } from "../../components/LoginInput"

const Login = () => {
  const [logging, setLogging] = useState(true)
  const [loginE, setLoginEmail] = useState("")
  const [loginP, setLoginPwd] = useState("")
  const [registerE, setRgsEmail] = useState("")
  const [registerP, setRgsPwd] = useState("")

  const navigate = useNavigate()
  
  const clearFields = () => {
    setLoginEmail("")
    setLoginPwd("")
    setRgsEmail("")
    setRgsPwd("")
  }

  const loginValidation = async () => {
    if (navigator.onLine) {
      if (loginE != '' && loginP != ''){
        signInUser(loginE, loginP, navigate)
      } else {
        alert("Please, fill out all the fields")
      }
    } else {
      alert("No internet connection!, please try again later.")
    }
  }

  const registerValidation = () => {
    if (navigator.onLine) {
      if (registerE != '' && registerP != ''){
        createUser(registerE, registerP, navigate)
      } else {
        alert("Please, fill out all the fields")
      }
    } else {
      alert("No internet connection!, please try again later.")
    }
  }

  const googleBtn = () => {
    google.accounts.id.initialize({
      client_id: process.env.GAK,
      callback: credentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  useEffect(() => {
    if (navigator.onLine) {
      isUserLogged(navigate)
    }
  }, [])


  return (
    <>
      <Navbar />
      <div className="container border rounded mt-5 bg-dark text-white">
        {logging ? 
          <>
            <div className="text-center mt-3">
              <h5>Sign in</h5>
            </div>
            <div className="container pt-0">
              <form>
                <LoginInput inputId="loginEmail" inputLabel="Email" inputOnChangeFunc={setLoginEmail} inputPlaceholder="example@example.com" 
                            inputType="text" inputValue={loginE} />
                <LoginInput inputId="loginPassword" inputLabel="Password" inputOnChangeFunc={setLoginPwd} inputPlaceholder="password" 
                            inputType="password" inputValue={loginP} />
                <button type="  button" className="btn btn-light mx-3" onClick={() => {
                  loginValidation()
                }}>Sign In</button>
              </form>
            </div>
            <div className="text-center">
                <p>You don't have an account? <button type="button" className="btn btn-link text-white" onClick={() => { 
                      clearFields()
                      setLogging(!logging)
                  }}>Register</button>
                </p>
            </div>
          </>
          :
          <>
            <div className="text-center mt-3">
              <h5>Create account</h5>
            </div>
            <div className="container pt-0">
              <form>
                <LoginInput inputId="caEmail" inputLabel="Email" inputOnChangeFunc={setRgsEmail} inputPlaceholder="example@example.com" 
                            inputType="text" inputValue={registerE} />
                <LoginInput inputId="caPassword" inputLabel="Password" inputOnChangeFunc={setRgsPwd} inputPlaceholder="password" 
                            inputType="password" inputValue={registerP} />
                <button type="button" className="btn btn-light mx-3" onClick={() => {
                  registerValidation()
                }}>Create Account</button>
              </form>
            </div>
            <div className="text-center">
              <p>Already have an account? <button type="button" className="btn btn-link text-white" onClick={() => { 
                    clearFields()
                    setLogging(!logging)
                }}>Sign in</button>
              </p>
            </div>
          </>
        }
        <div className="d-flex justify-content-center mb-5"  onLoad={googleBtn()}>
          <div id="buttonDiv"></div>
        </div>
      </div>
    </>
  )
}

export default Login