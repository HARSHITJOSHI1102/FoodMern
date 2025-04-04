import React, { useState } from 'react'
import "./LoginPopUp.css"
import { assets } from '../../assets/assets'
const LoginPopUp = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Login")
    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Login" ? <></> : <input type="text" placeholder='Your name' required />}

                    <input type="email" placeholder='Your email' required />
                    <input type="password" placeholder='password' required />
                </div>
                <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By Continuing , I Agree To The Terms of Use &Privacy Policy</p>
                </div>
                {currState === "Login" ? <p>Create A New Account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p> : <p>Already Have An Account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>}


            </form>
        </div>
    )
}

export default LoginPopUp