import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link } from "react-router-dom";

// Route for /posts, /profile, /login, /register

const NavBar = () => {
    return (
        <div id="navbar">
            <div id="logo">
                <h2>Stranger's Things</h2>
            </div>
            <div id="menu">
                <Link to="/">HOME</Link>
                <Link to="/posts">POSTS</Link>
                <Link to="/profile">PROFILE</Link>
                <Link to="/login">LOGIN</Link>
                <Link to="/register">REGISTER</Link>
            </div>
        </div>
    )
}

const Main = () => {
    return (
        // Link={Link} 

        <BrowserRouter>
            <NavBar />
        </BrowserRouter>
    )
}

const app = document.getElementById('app')
// const app = createRoot(document.getElementById('app'))
ReactDOM.render(<Main />, app)