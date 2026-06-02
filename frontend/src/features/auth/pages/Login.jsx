import React, { useState } from 'react'
import "./Login.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
const Login = () => {
    const navigate=useNavigate()
    const { loading, handleLogin } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = async (e) => {
        handleLogin({ email, password })
        alert('Login success')
        navigate('/')
    }
    if (loading)
        return (<main><h1>Loading...</h1></main>)
    return (
        <>
            <div className="form-container">
                <h1>Login </h1>
                <form onSubmit={submitHandler}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name="email" placeholder='enter your email' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name="password" placeholder='enter your password' required />
                    </div>
                    <button
                        type="submit"
                        className="Login-btn"
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>

                    <p className="auth-text">
                        Don’t have an account?
                        <span>
                            <Link to="/register"> Register</Link>
                        </span>
                    </p>
                </form>
            </div>
        </>
    )
}

export default Login
