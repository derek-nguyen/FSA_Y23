import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../utilities/apiClient";
import AddPost from "./AddPost.js";
import { Link } from "react-router-dom";

const Posts = (props) => {
    const { token } = props;
    const [posts, setPosts] = useState([]);

    // Fetches all posts in the server
    const fetchPosts = async () => {
        try {
            const data = await fetchFromAPI({
                endpoint: 'posts',
                token
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
    
    // console.log(token)
    
    return (
        <>
            <h1>Posts</h1>
            {token && <AddPost token={token} fetchPosts={fetchPosts}/>}
                {/* <>
                    <AddPost token={token} fetchPosts={fetchPosts} />
                    <Link to={'/posts/add'}>Add Post</Link>
                </>
            } */}
            {/* <AddPost token={token} fetchPosts={fetchPosts}/> */}
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