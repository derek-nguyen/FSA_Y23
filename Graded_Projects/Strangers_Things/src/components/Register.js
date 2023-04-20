import React, { useState } from "react";

const Register = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestBody = {
            guest: {
                username,
                password
            }
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(requestBody)
        }
        /*
        create an api call that will POST the user's information to the server 
        should return a token if successful
        store the token in state (top level // app.js then pass down the setToken function to set token state)

        const res = await fetch(...Post method)
        const result = await fetch
        */
    }

    return (
        <>
            <h1>Sign Up</h1>
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
                <button type="submit">Register</button>
            </form>
        </>
    )
}