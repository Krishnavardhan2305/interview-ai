import React, { useState } from 'react';
import "./Register.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {

    const navigate = useNavigate();

    const { loading, handleRegister } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {

        e.preventDefault();

        try {
            console.log("HI from handler");
            
            const data = await handleRegister({
                username,
                email,
                password
            });

            alert(data.message);

            navigate("/login");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="register-container">

            <h1>Create Account</h1>

            <form onSubmit={submitHandler}>

                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="register-btn"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="auth-text">
                    Already have an account?
                    <span>
                        <Link to="/login">
                            Login here
                        </Link>
                    </span>
                </p>

            </form>

        </div>
    );
};

export default Register;