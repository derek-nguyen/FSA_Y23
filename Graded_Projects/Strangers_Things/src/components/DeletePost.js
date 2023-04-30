import React from "react";
import { fetchFromAPI } from "../utilities/apiClient";

const DeletePost = ({ post_id, storedToken, fetchPosts }) => {

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetchFromAPI({
                endpoint: 'deletePosts',
                method: 'delete',
                token: storedToken
            }, post_id);

            await fetchPosts();
            
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <button className="delete-post-btn" type="submit">Delete</button>
            </form>
        </>
    )
}

export default DeletePost;