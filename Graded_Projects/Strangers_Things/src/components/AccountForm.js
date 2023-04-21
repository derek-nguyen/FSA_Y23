import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utilities/apiClient";

const AccountForm = ({ setToken }) => {
    const params = useParams()
    const { actionType } = params;
    console.log(actionType)

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

        console.log(data);
        // const options = {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(requestBody)
        // }
        /*
        create an api call that will POST the user's information to the server 
        should return a token if successful
        store the token in state (top level // app.js then pass down the setToken function to set token state)

        const res = await fetch(...Post method)
        const result = await fetch
        */
        // let response;
        // if (actionType === 'register') {
        //      response = await fetch(API_URL + API_OBJECTS.Users.register, options);
        // } else if (actionType === 'login') {
        //      response = await fetch(API_URL + API_OBJECTS.Users.login, options);
        // }
        // const result = await response.json();
        // console.log(result)
        // setToken(result?.data?.token)
    }

    return (
        <>
            <h1>{actionType === 'register' ? "Sign Up" : "Log In"}</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
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
        </>
    )
}

export default AccountForm;