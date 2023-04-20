import React from "react";
import { Route, Link, Routes } from "react-router-dom";

// Route for /posts, /profile, /login, /register

const App = () => {
    // Will need to userEffect with the [token] 



    return (
        <>
            <nav id="navbar">
                <div id="logo">
                    <h2>Stranger's Things</h2>
                </div>
                <Link to="/">HOME</Link>
                <Link to="/posts">POSTS</Link>
                <Link to="/profile">PROFILE</Link>
                <Link to="/login">LOGIN</Link>
                <Link to="/register">REGISTER</Link>
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
                }/>
                <Route path="/login" element={
                    <h1>Login Page</h1>
                }/>
                <Route path="/register" element={
                    <h1>Register your account</h1>
                }/>
            </Routes>
        </>
    )
}

export default App
// const app = createRoot(document.getElementById('app'))
// app.render(<App />)

// store user token in state 