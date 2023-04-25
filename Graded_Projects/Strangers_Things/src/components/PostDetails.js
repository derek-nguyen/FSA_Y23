import react, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetails = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const { posts } = props;
    const { postID } = params;

    // Changing posts object to array to so we can use .find
    const arrayPosts = Object.values(posts)

    // console.log(postItem)
    // console.log(arrayPosts)

    // Store the postItem in case of refresh
    const [postItem, setPostItem] = useState([])

    useEffect(() => {
        const postItem = arrayPosts.find(postItem => postItem._id == postID)
        setPostItem(postItem)
        // console.log(postItem)
    }, [arrayPosts, postID])

    // If the user refreshes, postItem will disappear and will result in undefined, in which case we'll reroute them back to posts
    useEffect(() => {
        if (!postItem) {
            navigate('/posts')
        }
        console.log(postItem)
    }, [postItem])

    
    return (
        <>
            {postItem
                ? <>
                    <h4>Title: {postItem.title}</h4>
                    <p>Price: {postItem.price}</p>
                    <p>Description: {postItem.description}</p>
                </>
                : <span></span>

            }
        </>
    )

}

export default PostDetails;