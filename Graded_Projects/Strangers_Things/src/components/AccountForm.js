import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { fetchFromAPI } from "../utilities/apiClient";

const AccountForm = ({ setToken, handleLogin }) => {
    const navigate = useNavigate();
    const params = useParams()
    const { actionType } = params;

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            user: {
                username,
                password
            }
        }

        const data = await fetchFromAPI({
            endpoint: actionType,
            method: 'post',
            body: requestBody,
        })

        // console.log(data)

        const userData = await fetchFromAPI({
            endpoint: 'me',
            token: data.token,
        })

        if (data.token && userData) {
            setUsername('');
            setPassword('');
            setToken(data.token);
            handleLogin(data.token, userData);
            navigate('/');
        }
    }

    return (
        <>
            <div className="auth-container">
                <h1>{actionType === 'register' ? "Sign Up" : "Log In"}</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        required
                        name="username"
                        type="text"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        required
                        name="password"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                    <button type="submit">{actionType === "register" ? "Register" : "Log In"}</button>
                    {actionType === "register"
                        ? <Link to="/account/Login">Already have an account? Log in here.</Link>
                        : <Link to="/account/register">Need an account? Register here.</Link>
                    }
                </form>
            </div>
        </>
    )
}

export default AccountForm;