// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchFromAPI } from "../utilities/apiClient"; 

// const SendMessage = ({ post_id, storedToken}) => {
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log(post_id);

//         // try {
//         //     const response = await fetchFromAPI({
//         //         endpoint: 'deletePosts',
//         //         method: 'delete',
//         //         token: storedToken
//         //     }, post_id);
            
//         // } catch (err) {
//         //     console.error(err)
//         // }
//     }
    
//     // This will take the user to the post's details
//     const handleClick = () => {
//         navigate(`/posts/${post_id}`)
//     }

//     return (
//         <>
//             {/* <form onSubmit={handleSubmit}> */}
//                 <button type="submit" onClick={handleClick}>Send Message</button>
//             {/* </form> */}
//         </>
//     )
// }

// export default SendMessage;