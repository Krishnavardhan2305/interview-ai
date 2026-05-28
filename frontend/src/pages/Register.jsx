import React, { useState } from 'react'
import axios from "axios";
import "./Register.scss";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(
                `${BASE_URL}/auth/register`,
                formData
            );

            alert(res.data.message);

            setFormData({
                username: "",
                email: "",
                password: ""
            });

        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="register-container">

                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        {
                            loading ? "Registering..." : "Register"
                        }
                    </button>
                <p className="auth-text">
                    Already have an account?
                    <span>
                        <Link to="/login">Login here</Link>
                    </span>
                </p>
                </form>
            </div>
        </>
    )
}

export default Register