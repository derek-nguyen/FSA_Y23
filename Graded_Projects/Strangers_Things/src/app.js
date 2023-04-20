import React, { useEffect, useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { AccountForm } from "./components"

// Route for /posts, /profile, /login, /register

const App = () => {
    // Will need to useEffect with the [token] 
    const [token,setToken] = useState(null)

    useEffect(()=>{
        console.log("TOKEN: " + token)
    },[token])

    return (
        <>
            <nav id="navbar">
                <div id="logo">
                    <h2>Stranger's Things</h2>
                </div>
                <Link to="/">HOME</Link>
                <Link to="/posts">POSTS</Link>
                <Link to="/profile">PROFILE</Link>
                {/* <Link to="/login">LOGIN</Link> */}
                <Link to="/account/login">LOGIN</Link>
            </nav>
            <Routes>
                <Route exact path="/" element={
                    <h1>Welcome to Strangers Things</h1>
                } />
                <Route path="/posts" element={
                    // Will replace this h1 tag with the component that renders all posts
                    <h1>List of posts</h1>
                } />
                <Route path="/profile" element={
                    <h1>Here's your profile</h1>
                } />
                {/* <Route path="/login" element={
                    <h1>Login Page</h1>
                } /> */}
                <Route path="/account/:actionType" element={
                    <>
                        {/* <h1>Register your account</h1> */}
                        <AccountForm setToken={setToken}/>
                    </>
                } />
            </Routes>
        </>
    )
}

export default App
// const app = createRoot(document.getElementById('app'))
// app.render(<App />)

// store user token in state 