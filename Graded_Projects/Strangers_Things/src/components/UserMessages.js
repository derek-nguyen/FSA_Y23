import react from "react";

const UserMessages = (props) => {
    const { storedUser } = props;

    return (
        <>
            <div className="user-message-container">
                <h2 className="user-profile-title">Sent Messages</h2>
                {
                    storedUser.messages.map(
                        ({ _id, post, fromUser, content }) => (
                            <>
                                {fromUser._id === storedUser._id
                                    ?
                                    <>
                                        <div key={_id} className="posts">
                                            <p>Post: {post.title}</p>
                                            <p>Created by: {fromUser.username}</p>
                                            <p>Your Message: {content}</p>
                                        </div>
                                        <br />
                                        <hr />
                                    </>
                                    : <span></span>
                                }
                            </>
                        )
                    )
                }
            </div>
        </>
    )
}

export default UserMessages;