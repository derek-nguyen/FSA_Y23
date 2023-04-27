import React from "react";
import { useNavigate } from "react-router-dom";
import AddPost from "./AddPost.js";
import DeletePost from "./DeletePost";

const Posts = (props) => {
    const navigate = useNavigate();
    const { storedToken, posts, fetchPosts } = props;
    
    return (
        <>
            <h1>Posts</h1>
            {storedToken && <AddPost storedToken={storedToken} fetchPosts={fetchPosts} />}

            <div>
                {posts
                    ? posts.map(
                        ({ _id, title, price, description, isAuthor }, idx) => (
                            <React.Fragment key={_id}>
                                <div>
                                    <h4>Title: {title}</h4>
                                    <p>Price: {price}</p>
                                    <p>Description: {description}</p>
                                    {isAuthor ? < DeletePost post_id={_id} storedToken={storedToken} fetchPosts={fetchPosts} /> : ""}
                                    {!isAuthor
                                        ? <button onClick={() => {
                                            // console.log(_id)
                                            const post_id = _id;
                                            navigate(`/posts/${post_id}`)
                                        }}>View Post</button>
                                        : <span></span>
                                    }
                                </div>
                                <hr />
                            </React.Fragment>
                        )
                    ) : <strong>No posts to display</strong>
                }
            </div >

        </>
    )
}

export default Posts