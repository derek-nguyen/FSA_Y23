import React, { useState } from "react";
import { fetchFromAPI } from "../utilities/apiClient";


const AddPost = ({ token, fetchPosts }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const addPost = async (event) => {
        event.preventDefault();
        const responseData = await fetchFromAPI({
            endpoint: 'posts',
            method: 'post',
            token,
            body: {
                post: {
                    title,
                    description,
                    price,
                }
            }
        });
        console.log(responseData);
        const { post } = responseData;
        if (post) {
            setTitle('');
            setDescription('');
            setPrice('')
            await fetchPosts();
        }
    }

    return (
        <>
            <form onSubmit={addPost}>
                <h2>Add a New Post</h2>

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                />
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    name="price"
                    onChange={event => setPrice(event.target.value)}
                    value={price}
                />
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    onChange={event => setDescription(event.target.value)}
                    value={description}
                />
                <button type="submit">Submit</button>
                <hr />
            </form>
        </>
    )
}

export default AddPost