import React from 'react'
import "./Login.scss";
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate=useNavigate();
   const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(
            `${BASE_URL}/auth/login`,
            {
                email: e.target.email.value,
                password: e.target.password.value
            }
        );
        alert(res.data.message);
        navigate("/dashboard");
    } catch (err) {
        alert(
            err.response?.data?.message || "Something went wrong"
        );
    }
};
    return (
        <>
            <div className="form-container">
                <h1>Login </h1>
                <form onSubmit={submitHandler}> 
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder='enter your email' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder='enter your password' required />
                    </div>
                    <button type="submit" className="button primary-button">
                        Login
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
