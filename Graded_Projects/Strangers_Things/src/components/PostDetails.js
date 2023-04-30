import react, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SendMessage from "./SendMessage";

const PostDetails = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const { posts, storedToken, token } = props;
    const { postID } = params;

    // Changing posts object to array to so we can use .find
    const arrayPosts = Object.values(posts)

    // Store the postItem in case of refresh
    const [postItem, setPostItem] = useState([])

    useEffect(() => {
        const postItem = arrayPosts.find(postItem => postItem._id == postID)
        setPostItem(postItem)
    }, [arrayPosts, postID])

    // if postItem disappears for some reason reroute them back to posts
    useEffect(() => {
        if (!postItem) {
            navigate('/posts')
        }
    }, [])

    return (
        <>
            {postItem
                ?
                <>
                    <div className="posts">
                        <h4>Title: {postItem.title}</h4>
                        <p>Price: {postItem.price}</p>
                        <p>Description: {postItem.description}</p>
                        {token || storedToken ? <SendMessage postItem={postItem} storedToken={storedToken} /> : <span></span>}
                    </div>
                </>
                : <span></span>
            }
        </>
    )

}

export default PostDetails;