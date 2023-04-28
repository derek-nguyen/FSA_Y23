import React, { useEffect, useState } from "react";
import { Route, Link, Routes } from "react-router-dom";
import {
    UserProfile,
    AccountForm,
    Posts,
    PostDetails,
    Logout
} from "./components"
import { fetchFromAPI } from '../src/utilities/apiClient.js'

// Route for /posts, /profile, /login, /register

const App = () => {
    const [token, setToken] = useState(null);
    const [posts, setPosts] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'))

    // Continuously check session information of user
    // console.log(storedToken)
    // console.log(storedUser)
    // console.log(`This is your persistent token: ${localStorage.getItem('token')}`);

    // Fetches all posts in the server
    const fetchPosts = async () => {
        try {
            const data = await fetchFromAPI({
                endpoint: 'posts',
                token: storedToken
            })

            if (data?.posts) {
                setPosts(data.posts)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleLogin = (storedToken, userData) => {
        localStorage.setItem('token', storedToken);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    useEffect(() => {
        // console.log("TOKEN: " + token)
        // setting dependency with token will refresh page when a token is created
        fetchPosts();
    }, [storedToken, token])

    return (
        <>
            <nav id="navbar">
                <div id="logo">
                    <h2>Stranger's Things</h2>
                </div>
                <Link to="/">HOME</Link>
                <Link to="/posts">POSTS</Link>
                <Link to="/profile">PROFILE</Link>
                {storedToken
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
                <Route exact path="/posts" element={
                    <>
                        {/* <SearchPost searchTerm={searchTerm} setSearchTerm={setSearchTerm} posts={posts} setPosts={posts} fetchPosts={fetchPosts}/> */}
                        <Posts token={token} storedToken={storedToken} posts={posts} fetchPosts={fetchPosts} />
                    </>
                } />
                <Route path="/posts/:postID" element={
                    <>
                        <PostDetails posts={posts} storedToken={storedToken}/>
                    </>
                }>

                </Route>
                <Route path="/profile" element={
                    // <h1>Here's your profile</h1>
                    <UserProfile storedToken={storedToken} storedUser={storedUser}/>
                } />
                <Route path="/account/:actionType" element={
                    <>
                        <AccountForm setToken={setToken} handleLogin={handleLogin} />
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