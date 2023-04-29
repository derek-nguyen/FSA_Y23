import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPost from "./AddPost.js";
import DeletePost from "./DeletePost";

const Posts = (props) => {
    const navigate = useNavigate();
    const { storedToken, posts, fetchPosts } = props;

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const handleSearch = (event) => {
        const substring = event.target.value
        setSearchTerm(substring)

        if (substring.trim() !== "") {
            const filteredPosts = posts
                .filter(post =>
                    post.title.toLowerCase().includes(substring.toLowerCase().trim())
                );
            setFilteredPosts(filteredPosts.length ? filteredPosts : posts);
        } else {
            setFilteredPosts(posts)
        }
    }

    // console.log(filteredPosts)
    // console.log(searchTerm)
    return (
        <>
            <h1>Posts</h1>
            {storedToken && <AddPost storedToken={storedToken} fetchPosts={fetchPosts} />}

            <input
                type="text"
                name="search"
                onChange={handleSearch}
                value={searchTerm}
            />

            <div>
                {filteredPosts && filteredPosts.length > 0
                    ? filteredPosts.map(
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
                    ) 
                    : posts && posts.length > 0 ? posts.map(
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
                    ) 
                    : <span>No post to show</span>
                }
            </div >

        </>
    )
}

export default Posts