import react from "react";

const UserMessages = (props) => {
    const { storedUser } = props;

    return (
        <>
            <h2>Your Messages</h2>
            {
                storedUser.messages.map(
                    ({ _id, post, fromUser, content }) => (
                        <>
                            {fromUser._id === storedUser._id 
                                ?
                                <>
                                    <div key={_id}>
                                        <p>Post: {post.title}</p>
                                        <p>Created by: {fromUser.username}</p>
                                        <p>Your Message: {content}</p>
                                    </div>
                                    <br/>
                                    <hr />
                                </>
                                : <span></span>
                            }
                        </>
                    )
                )
            }
        </>
    )
}

export default UserMessages;