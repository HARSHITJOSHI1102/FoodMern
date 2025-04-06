import React, { useContext, useState } from 'react'
import "./LoginPopUp.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
const LoginPopUp = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }
    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Login" ? <></> : <input name="name" type="text" onChange={onChangeHandler} value={data.name} placeholder='Your name' required />}

                    <input type="email" name='email' onChange={onChangeHandler}
                        value={data.email} placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler}
                        value={data.password} type="password" placeholder='password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By Continuing , I Agree To The Terms of Use &Privacy Policy</p>
                </div>
                {currState === "Login" ? <p>Create A New Account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p> : <p>Already Have An Account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>}


            </form>
        </div>
    )
}

export default LoginPopUp