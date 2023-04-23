import React, { useEffect, useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import {
    AccountForm,
    Posts,
    Logout
} from "./components"

// Route for /posts, /profile, /login, /register

const App = () => {
    // Will need to useEffect with the [token] 
    const [token, setToken] = useState(null)
    console.log(token)

    const handleLogout = () => {
        setToken(null)
    }

    useEffect(() => {
        // console.log("TOKEN: " + token)
        // setting dependency with token will refresh page when a token is created
    }, [token])

    return (
        <>
            <nav id="navbar">
                <div id="logo">
                    <h2>Stranger's Things</h2>
                </div>
                <Link to="/">HOME</Link>
                <Link to="/posts">POSTS</Link>
                <Link to="/profile">PROFILE</Link>
                {token
                    ?
                    <Link
                        to="/account/logout"
                        onClick={() => handleLogout()}
                    >
                        LOGOUT
                    </Link>
                    : <Link to="/account/login">LOGIN</Link>}


                {/* <Link to="/account/register">REGISTER</Link> */}
            </nav>
            <Routes>
                <Route exact path="/" element={
                    <h1>Welcome to Strangers Things</h1>
                } />
                <Route path="/posts" element={
                    // Will replace this h1 tag with the component that renders all posts
                    <>
                        <Posts token={token} />
                    </>
                } />
                <Route path="/profile" element={
                    <h1>Here's your profile</h1>
                } />
                {/* <Route path="/login" element={
                    <h1>Login Page</h1>
                } /> */}
                <Route path="/account/:actionType" element={
                    <>
                        <AccountForm setToken={setToken} token={token} />
                    </>
                } />
                <Route path="/account/logout" element={
                    <Logout handleLogout={handleLogout} />
                } />
            </Routes>
        </>
    )
}

export default App