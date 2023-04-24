import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../utilities/apiClient";
import AddPost from "./AddPost.js";

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
            {storedToken && <AddPost storedToken={storedToken} fetchPosts={fetchPosts}/>}
                
            <div>
                {posts
                    ? posts.map(
                        ({ title, price, description }, idx) => (
                            <div key={idx}>
                                <h4>Title: {title}</h4>
                                <p>Price: {price}</p>
                                <p>Description: {description}</p>
                            </div>
                        )
                    ) : <strong>No posts to display</strong>
                }
            </div>

        </>
    )
}

export default Posts