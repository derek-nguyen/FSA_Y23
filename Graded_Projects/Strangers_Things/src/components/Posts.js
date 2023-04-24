import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { fetchFromAPI } from "../utilities/apiClient";
import AddPost from "./AddPost.js";
import DeletePost from "./DeletePost";
import SendMessage from "./SendMessage";

const Posts = (props) => {
    const { storedToken } = props;
    const [posts, setPosts] = useState([]);

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

    useEffect(() => {
        fetchPosts();
    }, [])

    // console.log(storedToken)
    return (
        <>
            <h1>Posts</h1>
            {storedToken && <AddPost storedToken={storedToken} fetchPosts={fetchPosts} />}

            <div>
                {posts
                    ? posts.map(
                        ({ _id, title, price, description, isAuthor }, idx) => (
                            <React.Fragment key={idx}>
                                <div key={_id}>
                                    <h4>Title: {title}</h4>
                                    <p>Price: {price}</p>
                                    <p>Description: {description}</p>
                                    {isAuthor ? < DeletePost post_id={_id} storedToken={storedToken} fetchPosts={fetchPosts} /> : ""}
                                    {!isAuthor
                                        ? <SendMessage post_id={_id} storedToken={storedToken}/>
                                        : <span></span>

                                    }
                                </div>
                            </React.Fragment>
                        )
                    ) : <strong>No posts to display</strong>
                }
            </div>

        </>
    )
}

export default Posts