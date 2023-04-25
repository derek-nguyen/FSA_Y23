import react from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
    const params = useParams();

    const { postID } = params;
    console.log(postID);
}


export default PostDetails;